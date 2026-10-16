import { FileIcon, GitHubIcon, LinkedInIcon } from "@/components/icons";
import { SectionHeader } from "@/components/section-header";
import { site } from "@/data/site";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Prisma",
  "Docker",
  "AWS",
];

const links = [
  { href: site.links.github, label: "GitHub", Icon: GitHubIcon, external: true },
  { href: site.links.linkedin, label: "LinkedIn", Icon: LinkedInIcon, external: true },
  { href: site.links.cv, label: "Download CV (PDF)", Icon: FileIcon, external: false, download: site.links.cvFilename },
];

// From the resume (public/derrick-omanwa-cv.pdf). Keep the two in sync.
const experience = [
  {
    company: "lobstr",
    roles: [
      { title: "Lead Engineer", dates: "Aug 2026 – Oct 2026" },
      { title: "Senior React Engineer", dates: "Mar 2023 – Aug 2026" },
      { title: "React Engineer", dates: "Aug 2020 – Mar 2023" },
      { title: "Python Data Engineer", dates: "Jan 2020 – Aug 2020" },
    ],
  },
  {
    company: "Megatherium",
    roles: [{ title: "Application Engineer", dates: "May 2022 – Dec 2022" }],
  },
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line py-24 md:py-32">
      <div className="container-page">
        <SectionHeader index="03" eyebrow="About" title="Engineer first, lead when it helps." id="about-title" />

        <div className="grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,24rem)] lg:gap-20">
          <div className="space-y-5 text-lg leading-relaxed text-muted text-pretty">
            <p>
              <span className="text-fg">I&apos;m Derrick, a full-stack engineer based in Nairobi.</span>{" "}
              I like owning a problem all the way through: figuring out what
              people actually need, designing the data, writing the code and
              watching it run in production.
            </p>
            <p>
              I&apos;ve spent most of my career at lobstr. I joined in 2020 as a
              Python data engineer building ETL pipelines, moved into React and
              then senior React engineering, and most recently led the
              engineering team as Lead Engineer. Along the way I led the
              migration to Next.js that cut initial load times by 40%, built
              Node.js APIs handling 200K+ requests a day at 99.9% uptime, and set
              up CI/CD that took deploys from 45 minutes to 10.
            </p>
            <p>
              In 2022 I also spent eight months at Megatherium building
              serverless React apps on AWS. Outside of work I build products to
              try ideas quickly; two of them are on this page. I&apos;m now
              looking for a remote role with a US team where I can do the same
              thing at a bigger scale.
            </p>

            <ul className="flex flex-wrap gap-3 pt-5">
              {links.map(({ href, label, Icon, external, download }) => (
                <li key={label}>
                  <a
                    href={href}
                    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                    download={download}
                    className="inline-flex items-center gap-2 rounded-full border border-line-strong px-4 py-2.5 text-base font-medium text-fg transition-colors hover:border-fg/40 hover:bg-surface-2"
                  >
                    <Icon />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <div>
              <h3 className="eyebrow mb-4">Experience</h3>
              <div className="space-y-4">
                {experience.map((job) => (
                  <div key={job.company} className="rounded-2xl border border-line bg-surface p-6">
                    <p className="flex items-baseline justify-between gap-3">
                      <span className="font-display text-xl font-semibold tracking-tight">{job.company}</span>
                      <span className="font-mono text-xs text-muted">Remote</span>
                    </p>
                    <ol className="mt-4 space-y-3 border-l border-line pl-4">
                      {job.roles.map((role, i) => (
                        <li key={role.title} className="relative">
                          <span
                            aria-hidden
                            className={`absolute top-2 -left-[1.3rem] size-2 rounded-full ${i === 0 ? "bg-accent" : "bg-line-strong"}`}
                          />
                          <p className="font-medium text-fg">{role.title}</p>
                          <p className="font-mono text-xs text-muted">{role.dates}</p>
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="eyebrow mb-4">Education</h3>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-display text-xl font-semibold tracking-tight">
                  BS, Applied Computer Technology
                </p>
                <p className="text-muted">United States International University–Africa</p>
                <p className="mt-2 font-mono text-xs text-muted">Sep 2015 – Apr 2020</p>
              </div>
            </div>
            <div>
              <h3 className="eyebrow mb-4">Stack</h3>
              <ul className="flex flex-wrap gap-2">
                {stack.map((s) => (
                  <li key={s} className="chip">
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
