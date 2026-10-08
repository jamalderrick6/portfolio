// Drives the "Shipped" grid on the home page and every /work/[slug] page.
// Order here is display order. Entries marked PLACEHOLDER need real copy,
// links and screenshots.

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
  /** ISO date (YYYY-MM or YYYY-MM-DD) of launch or last major release. */
  date: string;
  // Detail-page content
  description: string[];
  screenshots: { src: string; alt: string }[];
  stack: string[];
  learned: string[];
};

export const projects: Project[] = [
  {
    // PLACEHOLDER copy
    slug: "dead-star",
    name: "DEAD STAR",
    oneLiner: "A small browser game about keeping a dying star alive for one more minute.",
    tags: ["Game", "Canvas", "TypeScript"],
    status: "live",
    url: "https://example.com/dead-star",
    image: "/projects/dead-star.svg",
    date: "2026-08",
    description: [
      "DEAD STAR is a weekend project that got out of hand: a one-screen arcade game where you route energy into a collapsing star while debris closes in.",
      "Everything renders on a single canvas with a fixed-timestep loop, so it plays the same on a cheap Android phone as on a desktop.",
    ],
    screenshots: [
      { src: "/projects/dead-star.svg", alt: "DEAD STAR gameplay screen" },
    ],
    stack: ["TypeScript", "Canvas 2D", "Vite", "Vercel"],
    learned: [
      "A fixed-timestep game loop removes a whole class of frame-rate bugs.",
      "Scope cuts are a design tool: the game got better every time a feature was removed.",
    ],
  },
  {
    // PLACEHOLDER copy
    slug: "botsignal",
    name: "BotSignal",
    oneLiner: "Scores incoming traffic for bot likelihood from a handful of cheap request signals.",
    tags: ["Data", "API", "Node.js"],
    status: "live",
    url: "https://example.com/botsignal",
    image: "/projects/botsignal.svg",
    date: "2026-05",
    description: [
      "BotSignal is a lightweight scoring API. You send it request metadata and it returns a 0–100 bot likelihood with the signals that drove the score.",
      "It came out of years of working on the other side of the fence (building scrapers) and knowing exactly which shortcuts automated clients take.",
    ],
    screenshots: [
      { src: "/projects/botsignal.svg", alt: "BotSignal dashboard showing traffic scores" },
    ],
    stack: ["Node.js", "TypeScript", "PostgreSQL", "Redis", "Next.js"],
    learned: [
      "Explainable scores beat accurate black boxes: users trust a score they can argue with.",
      "Cheap signals combined well outperform one expensive signal.",
    ],
  },
  {
    // PLACEHOLDER copy
    slug: "contentbunker",
    name: "ContentBunker",
    oneLiner: "Saves the articles, threads and videos you care about before they disappear.",
    tags: ["Scraping", "Full-stack", "Storage"],
    status: "live",
    url: "https://example.com/contentbunker",
    image: "/projects/contentbunker.svg",
    date: "2026-02",
    description: [
      "ContentBunker archives a full, readable copy of a page the moment you save it, so links that rot or get deleted stay readable.",
      "The capture pipeline runs a headless browser, strips the page down to its content and stores a clean snapshot alongside the original HTML.",
    ],
    screenshots: [
      { src: "/projects/contentbunker.svg", alt: "ContentBunker library view" },
    ],
    stack: ["Next.js", "Playwright", "PostgreSQL", "S3-compatible storage"],
    learned: [
      "Capture once, render many: storing the raw snapshot made every later feature easier.",
      "Queue everything that touches a headless browser.",
    ],
  },
  {
    slug: "cinemai",
    name: "cinemai",
    oneLiner: "A portfolio and marketplace platform for AI video creators.",
    tags: ["Marketplace", "Next.js", "Postgres"],
    status: "wip",
    url: "https://example.com/cinemai",
    image: "/projects/cinemai.svg",
    date: "2026-10",
    description: [
      "cinemai gives AI video creators a proper home: a portfolio that shows their work well, and a marketplace where clients can find and hire them.",
      "Phase 1 covers creator profiles, uploads and discovery, including style-similarity search so clients can find creators whose work looks like a reference clip.",
    ],
    screenshots: [
      { src: "/projects/cinemai.svg", alt: "cinemai creator portfolio page" },
    ],
    stack: [
      "Next.js (App Router)",
      "TypeScript",
      "PostgreSQL + Drizzle",
      "pgvector",
      "Auth.js",
      "Tailwind CSS",
    ],
    learned: [
      "pgvector inside the main database is plenty for similarity search at this scale; no separate vector store needed.",
      "JWT sessions without a DB adapter keep auth simple while the data model is still moving.",
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
