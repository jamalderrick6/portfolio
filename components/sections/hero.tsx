import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "@/components/icons";
import { site } from "@/data/site";

const facts = [
  { value: "6 yrs", label: "leading an engineering team" },
  { value: "End to end", label: "from database schema to pixels" },
  { value: "UTC+3", label: "afternoons overlap US mornings" },
];

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Soft accent glow + grid texture, purely decorative */}
      <div
        aria-hidden
        className="hero-grid pointer-events-none absolute inset-0 opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-56 right-[-20%] size-[48rem] bg-[radial-gradient(closest-side,rgb(255_138_61/0.16),transparent)]"
      />

      <div className="container-page relative pt-16 pb-20 sm:pt-24 md:pt-32 md:pb-28">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_18rem] lg:items-center lg:gap-16 xl:grid-cols-[minmax(0,1fr)_20rem] xl:gap-20">
          {/* One image: a small round avatar on phones/tablets, a framed portrait in the right column on large screens. */}
          <div className="relative w-fit lg:order-last lg:w-full">
            <div
              aria-hidden
              className="absolute inset-0 hidden translate-x-3 translate-y-3 rounded-[2rem] border border-accent/40 lg:block"
            />
            <div className="relative size-20 overflow-hidden rounded-full border border-line-strong bg-surface-2 sm:size-24 lg:aspect-[4/5] lg:size-auto lg:w-full lg:rounded-[2rem]">
              <Image
                src="/derrick-omanwa.jpg"
                alt="Derrick Omanwa"
                fill
                loading="eager"
                sizes="(min-width: 1280px) 320px, (min-width: 1024px) 288px, 96px"
                className="object-cover object-[50%_30%]"
              />
            </div>
          </div>

          <div>
            <p className="eyebrow mb-7 flex items-center gap-2.5">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400/60 motion-reduce:hidden" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
              </span>
              {site.tagline}
            </p>

            <h1
              id="hero-title"
              className="max-w-4xl font-display text-[2.6rem] leading-[1.04] font-bold tracking-[-0.035em] text-balance xs:text-5xl sm:text-6xl xl:text-7xl"
            >
              I build web products end to end —{" "}
              <span className="text-muted">and ship small ones for fun.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted text-pretty sm:text-xl">
              Senior full-stack engineer in Nairobi. I spent six years leading the
              engineering team at lobstr.io, building scrapers, data pipelines and
              the React apps on top of them. Now looking for the next team to build
              with.
            </p>

            <div className="mt-10 flex flex-col gap-3 xs:flex-row">
              <Link
                href="#work"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors hover:bg-accent-soft"
              >
                See my work
                <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-line-strong px-6 py-3.5 font-semibold text-fg transition-colors hover:border-fg/40 hover:bg-surface-2"
              >
                Get in touch
              </Link>
            </div>
          </div>
        </div>

        <dl className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-3 md:mt-24">
          {facts.map((f) => (
            <div key={f.value} className="bg-bg/95 px-6 py-5">
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-2xl font-semibold tracking-tight">{f.value}</dd>
              <dd className="mt-1 text-sm text-muted">{f.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
