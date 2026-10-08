import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/icons";
import { StatusBadge } from "@/components/status-badge";
import { formatProjectDate, type Project } from "@/data/projects";

export function ProjectCard({ project, priority = false }: { project: Project; priority?: boolean }) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-colors duration-300 hover:border-line-strong">
      <div className="relative aspect-[16/10] overflow-hidden border-b border-line bg-surface-2">
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 768px) 50vw, 100vw"
          priority={priority}
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
        <StatusBadge status={project.status} className="absolute top-3 left-3 backdrop-blur" />
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-xl font-semibold tracking-tight">
            <Link href={`/work/${project.slug}`} className="after:absolute after:inset-0 after:content-['']">
              {project.name}
            </Link>
          </h3>
          <ArrowUpRight className="mt-1 shrink-0 text-muted transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
        </div>
        <p className="mt-2 leading-relaxed text-muted text-pretty">{project.oneLiner}</p>
        <div className="mt-auto flex flex-wrap items-center gap-x-3 gap-y-2 pt-6 font-mono text-xs text-muted">
          <time dateTime={project.date}>{formatProjectDate(project.date)}</time>
          <span aria-hidden className="text-line-strong">/</span>
          <ul className="flex flex-wrap gap-x-3 gap-y-1" aria-label="Tags">
            {project.tags.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
