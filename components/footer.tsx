import { cacheLife } from "next/cache";
import { FileIcon, GitHubIcon, LinkedInIcon, Logo } from "@/components/icons";
import { site } from "@/data/site";

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Logo width={24} height={24} />
          <p className="text-sm text-muted">
            © <CopyrightYear /> {site.name}. Built with Next.js, hosted on Vercel.
          </p>
        </div>
        <ul className="flex items-center gap-1 text-muted">
          <li>
            <a
              href={site.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <GitHubIcon />
            </a>
          </li>
          <li>
            <a
              href={site.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <LinkedInIcon />
            </a>
          </li>
          <li>
            <a
              href={site.links.cv}
              download={site.links.cvFilename}
              aria-label="Download CV (PDF)"
              className="grid size-10 place-items-center rounded-lg transition-colors hover:bg-surface-2 hover:text-fg"
            >
              <FileIcon />
            </a>
          </li>
          <li className="ml-3">
            <a href="#main" className="inline-block py-3 text-sm transition-colors hover:text-fg">
              Back to top ↑
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

// Cached so the prerendered shell doesn't read the clock; refreshes on each deploy.
async function CopyrightYear() {
  "use cache";
  cacheLife("days");
  return new Date().getFullYear();
}
