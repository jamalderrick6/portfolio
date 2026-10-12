// Single source of truth for personal details and outbound links.
// TODO: replace the placeholder LinkedIn handle before deploying.

const fallbackUrl = "http://localhost:3000";

function resolveSiteUrl() {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return fallbackUrl;
}

export const site = {
  name: "Derrick Omanwa",
  role: "Senior Full-Stack Engineer",
  location: "Nairobi, Kenya",
  url: resolveSiteUrl().replace(/\/$/, ""),
  tagline: "Nairobi · remote · open to US roles",
  description:
    "Derrick Omanwa is a senior full-stack engineer in Nairobi building web products end to end: product engineering, data pipelines, React frontends and team leadership. Open to remote US roles.",
  links: {
    github: "https://github.com/jamalderrick6",
    linkedin: "https://www.linkedin.com/in/your-handle",
    cv: "/derrick-omanwa-cv.pdf",
  },
} as const;
