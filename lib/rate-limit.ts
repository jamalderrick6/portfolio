// Sliding-window rate limit kept in memory. Simple by design: on Vercel each
// function instance has its own memory, so this caps bursts from one IP per
// instance rather than giving a hard global guarantee. Swap in a shared store
// (e.g. Upstash Redis) if the form ever attracts real abuse.

type Options = { limit: number; windowMs: number };

export function createRateLimiter({ limit, windowMs }: Options) {
  const hits = new Map<string, number[]>();
  let lastSweep = Date.now();

  return function check(key: string, now = Date.now()) {
    // Drop stale keys now and then so the map can't grow without bound.
    if (now - lastSweep > windowMs) {
      for (const [k, times] of hits) {
        if (times[times.length - 1] <= now - windowMs) hits.delete(k);
      }
      lastSweep = now;
    }

    const recent = (hits.get(key) ?? []).filter((t) => t > now - windowMs);
    if (recent.length >= limit) {
      hits.set(key, recent);
      return { ok: false as const, retryAfterSec: Math.ceil((recent[0] + windowMs - now) / 1000) };
    }
    recent.push(now);
    hits.set(key, recent);
    return { ok: true as const };
  };
}

/** Client IP as reported by the platform proxy (Vercel sets both headers). */
export function clientIp(request: Request) {
  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown"
  );
}
