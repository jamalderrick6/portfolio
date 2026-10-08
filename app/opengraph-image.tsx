import { ogSize, renderOgImage } from "@/lib/og";
import { site } from "@/data/site";

export const alt = `${site.name}, ${site.role}`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgImage({
    eyebrow: site.tagline,
    title: site.name,
    subtitle: "I build web products end to end — and ship small ones for fun.",
    footer: ["Full-stack", "Data pipelines", "React", "Team lead"],
  });
}
