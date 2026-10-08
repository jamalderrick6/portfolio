import type { ProjectStatus } from "@/data/projects";

export function StatusBadge({ status, className = "" }: { status: ProjectStatus; className?: string }) {
  const live = status === "live";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[0.7rem] tracking-wide uppercase ${
        live
          ? "border-emerald-400/30 bg-emerald-400/10 text-emerald-300"
          : "border-amber-300/30 bg-amber-300/10 text-amber-200"
      } ${className}`}
    >
      <span className={`size-1.5 rounded-full ${live ? "bg-emerald-400" : "bg-amber-300"}`} aria-hidden />
      {live ? "Live" : "In progress"}
    </span>
  );
}
