// Drives the "Shipped" grid on the home page and every /work/[slug] page.
// Order here is display order.

export type ProjectStatus = "live" | "wip";

export type Project = {
  slug: string;
  name: string;
  oneLiner: string;
  tags: string[];
  status: ProjectStatus;
  url: string;
  repo?: string;
  /** Card / hero image, path under /public. */
  image: string;
  /** ISO date (YYYY-MM or YYYY-MM-DD) the project started. */
  date: string;
  // Detail-page content
  description: string[];
  screenshots: { src: string; alt: string }[];
  stack: string[];
  /** Optional; the section is hidden when empty. */
  learned?: string[];
};

export const projects: Project[] = [
  {
    slug: "propelladocs",
    name: "PropellaDocs",
    oneLiner:
      "An AI proposal and SOW writer for IT consultants: paste a client email or brief and get a structured, client-ready document.",
    tags: ["SaaS", "AI", "Next.js", "Django"],
    status: "live",
    url: "https://propelladocs.ai",
    image: "/projects/propelladocs-editor.jpg",
    date: "2026-04",
    description: [
      "PropellaDocs writes client proposals and statements of work for IT and software consultants. Paste a client email or fill in a brief, and it drafts a structured, professional document. Beyond proposals and SOWs it covers solution designs, kickoff charters, post-mortems, QBRs, business cases and UAT plans.",
      "Documents are generated section by section from the brief, so each section can be reviewed, edited inline with autosave, or regenerated on its own. Finished documents export to PDF and DOCX, or go to the client as a shareable link that needs no account. Free, Starter and Pro plans are billed through Stripe.",
      "The editor is a Next.js app built on Plate. Behind it is a Django REST API with Celery workers and Redis for background jobs, PostgreSQL for storage, and Docker deploys on Render.",
    ],
    screenshots: [
      {
        src: "/projects/propelladocs-editor.jpg",
        alt: "PropellaDocs editor showing a generated consulting proposal with Understanding of the Need, Proposed Approach and Scope of Work sections",
      },
      {
        src: "/projects/propelladocs-brief.jpg",
        alt: "PropellaDocs brief form collecting client, project and approach details before generating a proposal",
      },
      {
        src: "/projects/propelladocs-export.jpg",
        alt: "PropellaDocs export section showing a proposal rendered as PDF pages",
      },
    ],
    stack: [
      "Next.js",
      "React",
      "TypeScript",
      "Plate",
      "Django REST Framework",
      "Celery",
      "Redis",
      "PostgreSQL",
      "OpenAI",
      "Stripe",
      "Docker",
      "Render",
    ],
  },
  {
    slug: "contentbunker",
    name: "ContentBunker",
    oneLiner:
      "Turns a real estate listing into a finished short-form video: AI script, voiceover, motion, captions and music.",
    tags: ["SaaS", "AI video", "Next.js", "Prisma"],
    status: "live",
    url: "https://www.contentbunker.com",
    image: "/projects/contentbunker-home.jpg",
    date: "2026-03",
    description: [
      "ContentBunker launched as AI software for short-form video agencies: a brief per client, AI ideation and scriptwriting, one-click client approval from a phone with no account needed, and a content calendar. That version is what the public site still shows.",
      "It has since pivoted to real estate. An agent pastes a listing and gets a finished video for TikTok, Instagram Reels and YouTube Shorts: an AI-written script, ElevenLabs voiceover, Ken Burns motion over the listing photos, burned-in captions and music, rendered with Remotion as background jobs on Trigger.dev.",
      "Billing runs on Stripe subscriptions plus one-time render packs, rendered video lives in Cloudflare R2, and script generation uses OpenAI with an Anthropic fallback.",
    ],
    screenshots: [
      {
        src: "/projects/contentbunker-home.jpg",
        alt: "ContentBunker home page with a client dashboard listing scripts by platform and approval status",
      },
      {
        src: "/projects/contentbunker-workflow.jpg",
        alt: "ContentBunker how-it-works section: client brief, AI ideation, script writing, client approval, schedule and track",
      },
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "PostgreSQL (Neon)",
      "Prisma",
      "Auth.js",
      "OpenAI",
      "Anthropic",
      "ElevenLabs",
      "Remotion",
      "Trigger.dev",
      "Cloudflare R2",
      "Stripe",
      "Sentry",
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function formatProjectDate(date: string) {
  const [year, month] = date.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, 1)).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  });
}
