import { ArrowUpRight } from "@/components/icons";
import { ProjectCard } from "@/components/project-card";
import { SectionHeader } from "@/components/section-header";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export function Shipped() {
  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="02" eyebrow="Shipped" title="Things I've built and put out there." id="work-title">
          Products I&apos;ve built and launched. Each one has a page with
          screenshots, how it works and the stack behind it.
        </SectionHeader>

        <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-64 flex-col justify-between rounded-2xl border border-dashed border-line-strong p-6 transition-colors duration-300 hover:border-accent/60 hover:bg-surface"
            >
              <span className="font-display text-5xl font-semibold text-muted transition-colors group-hover:text-accent">
                +
              </span>
              <span>
                <span className="block font-display text-xl font-semibold tracking-tight">
                  more in progress
                </span>
                <span className="mt-2 flex items-center gap-1.5 text-muted">
                  Follow along on GitHub
                  <ArrowUpRight className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </span>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
