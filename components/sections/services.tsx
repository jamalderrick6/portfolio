import { SectionHeader } from "@/components/section-header";

const services = [
  {
    title: "Full-stack product engineering",
    body: "I take a product from idea to production: data model, API, interface, deploys, and the monitoring that tells you it's still working next month.",
    tags: ["Node.js", "PostgreSQL", "Prisma", "Docker", "AWS"],
  },
  {
    title: "Scraping & data pipelines",
    body: "Scrapers and ETL pipelines that turn messy sources into clean, queryable data. I've built pipelines processing 5M+ records a day and reworked PostgreSQL schemas to make the queries behind them 60% faster.",
    tags: ["Python", "Node.js", "PostgreSQL"],
  },
  {
    title: "Frontend / React",
    body: "Fast, accessible interfaces in React and Next.js. I led a Next.js migration that cut initial load times by 40%, and I sweat the small details that make an app feel solid.",
    tags: ["React", "Next.js", "TypeScript"],
  },
  {
    title: "Team leadership",
    body: "As Lead Engineer at lobstr I guided the engineering team: technical direction, coding standards and code review, mentoring frontend and backend engineers, and a weekly alignment process that made delivery predictable.",
    tags: ["Mentoring", "Code review", "Delivery"],
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
