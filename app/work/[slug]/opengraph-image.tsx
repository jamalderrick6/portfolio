import { getProject, projects } from "@/data/projects";
import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Preview card for a project by Derrick Omanwa";
export const size = ogSize;
export const contentType = "image/png";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return new Response("Not found", { status: 404 });

  return renderOgImage({
    eyebrow: "Selected work",
    title: project.name,
    subtitle: project.oneLiner,
    footer: project.tags,
    badge:
      project.status === "live"
        ? { label: "Live", color: "#34d399" }
        : { label: "In progress", color: "#fcd34d" },
  });
}
