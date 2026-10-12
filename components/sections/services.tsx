import { SectionHeader } from "@/components/section-header";

const services = [
  {
    title: "Full-stack product engineering",
    body: "I take a product from idea to production: data model, API, interface, deploys, and the monitoring that tells you it's still working next month.",
    tags: ["Node.js", "PostgreSQL", "Prisma", "Docker", "AWS"],
  },
  {
    title: "Scraping & data pipelines",
    body: "Crawlers that hold up against real websites, with retries, sessions and headless browsers, feeding pipelines that turn messy pages into clean, queryable data.",
    tags: ["Python", "Node.js", "PostgreSQL"],
  },
  {
    title: "Frontend / React",
    body: "Fast, accessible interfaces in React and Next.js. Component systems, tricky state, and the small details that make an app feel solid.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Team leadership",
    body: "I ran the dev team at lobstr.io: hiring, code review, planning and helping a small team ship reliably, week after week.",
    tags: ["Hiring", "Mentoring", "Delivery"],
  },
];

export function Services() {
  return (
    <section aria-labelledby="services-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="01" eyebrow="What I do" title="Useful from the first commit." id="services-title">
          Most of my work sits where product, data and frontend meet. I&apos;m
          happiest owning a feature from the schema to the pixels.
        </SectionHeader>

        <ul className="spotlight-group grid gap-4 sm:grid-cols-2">
          {services.map((s, i) => (
            <li
              key={s.title}
              data-spotlight
              className="spotlight-card group relative flex flex-col rounded-2xl border border-line bg-surface p-7 transition-colors duration-300 hover:border-line-strong hover:bg-surface-2 md:p-8"
            >
              <span className="font-mono text-xs text-muted transition-colors group-hover:text-accent">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-3 leading-relaxed text-muted text-pretty">{s.body}</p>
              <ul className="mt-6 flex flex-wrap gap-2 pt-1 md:mt-auto md:pt-6" aria-label="Tools">
                {s.tags.map((t) => (
                  <li key={t} className="chip-outline">
                    {t}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
