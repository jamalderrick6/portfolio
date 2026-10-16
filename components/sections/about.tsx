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
              From 2020 to 2026 I was Engineering Lead at lobstr.io, where I
              managed the dev team. That meant building and maintaining scraping
              infrastructure at scale, the product people used on top of it, and
              the habits that kept a small team shipping without burning out.
            </p>
            <p>
              Outside of work I build small products to try ideas quickly. Some
              of them are on this page. I&apos;m now looking for a remote role
              with a US team where I can do the same thing at a bigger scale.
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
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-mono text-xs text-muted">2020 – 2026</p>
                <p className="mt-2 font-display text-xl font-semibold tracking-tight">Engineering Lead</p>
                <p className="text-muted">lobstr.io</p>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  Managed the dev team. Owned architecture, hiring, code review
                  and delivery.
                </p>
              </div>
            </div>
            <div>
              <h3 className="eyebrow mb-4">Education</h3>
              <div className="rounded-2xl border border-line bg-surface p-6">
                <p className="font-display text-xl font-semibold tracking-tight">
                  BS, Applied Computer Technology
                </p>
                <p className="text-muted">United States International University–Africa</p>
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
