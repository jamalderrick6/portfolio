import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight, GitHubIcon } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { formatProjectDate, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const path = `/work/${project.slug}`;
  return {
    title: project.name,
    description: project.oneLiner,
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      siteName: site.name,
      title: `${project.name} · ${site.name}`,
      description: project.oneLiner,
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} · ${site.name}`,
      description: project.oneLiner,
    },
  };
}

export default async function ProjectPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article>
      <header className="container-page pt-12 pb-12 sm:pt-16 md:pt-20">
        <Link
          href="/#work"
          className="group -my-2 inline-flex items-center gap-2 py-2 text-sm text-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="transition-transform duration-200 group-hover:-translate-x-0.5" />
          All work
        </Link>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <StatusBadge status={project.status} />
          <time dateTime={project.date} className="font-mono text-xs text-muted">
            {formatProjectDate(project.date)}
          </time>
        </div>
        <h1 className="mt-5 font-display text-5xl font-bold tracking-[-0.035em] sm:text-6xl lg:text-7xl">
          {project.name}
        </h1>
        <p className="mt-5 max-w-3xl text-xl leading-relaxed text-muted text-pretty sm:text-2xl">
          {project.oneLiner}
        </p>

        <div className="mt-9 flex flex-col gap-3 xs:flex-row">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 font-semibold text-on-accent transition-colors hover:bg-accent-soft"
          >
            {project.status === "live" ? "Visit live site" : "See the preview"}
            <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-line-strong px-6 py-3.5 font-semibold transition-colors hover:border-fg/40 hover:bg-surface-2"
            >
              <GitHubIcon />
              Source
            </a>
          ) : null}
        </div>
      </header>

      <section aria-label="Screenshots" className="container-page">
        <ul className="grid gap-5">
          {project.screenshots.map((s, i) => (
            <li
              key={s.src + i}
              className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-surface"
            >
              <Image
                src={s.src}
                alt={s.alt}
                fill
                priority={i === 0}
                sizes="(min-width: 1152px) 1088px, 100vw"
                className="object-cover"
              />
            </li>
          ))}
        </ul>
      </section>

      <div className="container-page grid gap-14 py-20 md:py-24 lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-20">
        <div className="space-y-14">
          <section aria-labelledby="overview">
            <h2 id="overview" className="eyebrow mb-5">
              Overview
            </h2>
            <div className="space-y-5 text-lg leading-relaxed text-fg/90 text-pretty">
              {project.description.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </section>
          <section aria-labelledby="learned">
            <h2 id="learned" className="eyebrow mb-5">
              What I learned
            </h2>
            <ul className="space-y-4">
              {project.learned.map((l) => (
                <li key={l} className="flex gap-4 text-lg leading-relaxed text-fg/90 text-pretty">
                  <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-accent" />
                  {l}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="space-y-10 lg:border-l lg:border-line lg:pl-10">
          <section aria-labelledby="stack">
            <h2 id="stack" className="eyebrow mb-4">
              Stack
            </h2>
            <ul className="flex flex-wrap gap-2">
              {project.stack.map((s) => (
                <li key={s} className="chip">
                  {s}
                </li>
              ))}
            </ul>
          </section>
          <section aria-labelledby="links">
            <h2 id="links" className="eyebrow mb-4">
              Links
            </h2>
            <ul className="space-y-2">
              <li>
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 break-all text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                >
                  {project.url.replace(/^https?:\/\//, "")}
                  <ArrowUpRight width={14} height={14} />
                </a>
              </li>
              {project.repo ? (
                <li>
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 break-all text-fg underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    Source code
                    <ArrowUpRight width={14} height={14} />
                  </a>
                </li>
              ) : null}
            </ul>
          </section>
        </aside>
      </div>

      {next.slug !== project.slug ? (
        <nav aria-label="Next project" className="border-t border-line">
          <Link
            href={`/work/${next.slug}`}
            className="group container-page flex items-center justify-between gap-6 py-12 md:py-16"
          >
            <span>
              <span className="eyebrow block">Next project</span>
              <span className="mt-2 block font-display text-3xl font-semibold tracking-tight transition-colors group-hover:text-accent sm:text-4xl">
                {next.name}
              </span>
            </span>
            <ArrowRight
              width={32}
              height={32}
              className="shrink-0 text-muted transition-all duration-200 group-hover:translate-x-1 group-hover:text-accent"
            />
          </Link>
        </nav>
      ) : null}
    </article>
  );
}
