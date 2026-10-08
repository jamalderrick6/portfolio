// Generates placeholder project artwork in public/projects/.
// Replace the output with real screenshots (same paths, or update data/projects.ts).
import { mkdir, writeFile } from "node:fs/promises";

const W = 1600;
const H = 1000;

const projects = [
  { slug: "dead-star", name: "DEAD STAR", hue: "#FF8A3D", motif: "star" },
  { slug: "botsignal", name: "BotSignal", hue: "#5EEAD4", motif: "bars" },
  { slug: "contentbunker", name: "ContentBunker", hue: "#A78BFA", motif: "list" },
  { slug: "cinemai", name: "cinemai", hue: "#F472B6", motif: "grid" },
];

function motif(kind, hue) {
  switch (kind) {
    case "star":
      return `
        <circle cx="1080" cy="560" r="150" fill="${hue}" opacity="0.9"/>
        <circle cx="1080" cy="560" r="230" fill="none" stroke="${hue}" stroke-opacity="0.35" stroke-width="2"/>
        <circle cx="1080" cy="560" r="320" fill="none" stroke="${hue}" stroke-opacity="0.18" stroke-width="2" stroke-dasharray="6 14"/>
        ${Array.from({ length: 28 }, (_, i) => {
          const a = (i / 28) * Math.PI * 2;
          const r = 380 + ((i * 37) % 90);
          return `<rect x="${1080 + Math.cos(a) * r}" y="${560 + Math.sin(a) * r}" width="10" height="10" fill="#E8ECF4" opacity="${0.25 + (i % 4) * 0.12}" transform="rotate(${i * 13} ${1080 + Math.cos(a) * r} ${560 + Math.sin(a) * r})"/>`;
        }).join("")}`;
    case "bars":
      return Array.from({ length: 18 }, (_, i) => {
        const h = 80 + ((i * 53) % 320);
        return `<rect x="${640 + i * 46}" y="${820 - h}" width="30" height="${h}" rx="4" fill="${i % 5 === 3 ? hue : "#1E2A44"}"/>`;
      }).join("") + `<polyline points="${Array.from({ length: 18 }, (_, i) => `${655 + i * 46},${380 + Math.sin(i / 2) * 60}`).join(" ")}" fill="none" stroke="${hue}" stroke-width="4"/>`;
    case "list":
      return Array.from({ length: 6 }, (_, i) => `
        <rect x="640" y="${290 + i * 90}" width="820" height="70" rx="10" fill="#111A2C" stroke="#1E2A44"/>
        <rect x="664" y="${310 + i * 90}" width="30" height="30" rx="6" fill="${i === 1 ? hue : "#26314A"}"/>
        <rect x="716" y="${312 + i * 90}" width="${300 + ((i * 97) % 300)}" height="12" rx="6" fill="#3A4766"/>
        <rect x="716" y="${334 + i * 90}" width="${180 + ((i * 61) % 200)}" height="10" rx="5" fill="#26314A"/>`).join("");
    case "grid":
      return Array.from({ length: 9 }, (_, i) => {
        const x = 640 + (i % 3) * 280;
        const y = 290 + Math.floor(i / 3) * 190;
        return `<rect x="${x}" y="${y}" width="256" height="166" rx="12" fill="${i === 4 ? hue : "#111A2C"}" fill-opacity="${i === 4 ? 0.85 : 1}" stroke="#1E2A44"/>
          <polygon points="${x + 112},${y + 62} ${x + 112},${y + 104} ${x + 148},${y + 83}" fill="${i === 4 ? "#070A13" : "#3A4766"}"/>`;
      }).join("");
  }
}

function svg({ name, hue, motif: kind }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <radialGradient id="glow" cx="72%" cy="58%" r="60%">
      <stop offset="0" stop-color="${hue}" stop-opacity="0.22"/>
      <stop offset="1" stop-color="${hue}" stop-opacity="0"/>
    </radialGradient>
    <clipPath id="panel"><rect x="60" y="124" width="${W - 120}" height="${H - 184}" rx="22"/></clipPath>
  </defs>
  <rect width="${W}" height="${H}" fill="#0A0F1C"/>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="60" y="60" width="${W - 120}" height="${H - 120}" rx="22" fill="#0C1220" stroke="#1E2A44" stroke-width="2"/>
  <rect x="60" y="60" width="${W - 120}" height="64" rx="22" fill="#0F1728"/>
  <rect x="60" y="100" width="${W - 120}" height="24" fill="#0F1728"/>
  <circle cx="104" cy="92" r="8" fill="#26314A"/><circle cx="132" cy="92" r="8" fill="#26314A"/><circle cx="160" cy="92" r="8" fill="#26314A"/>
  <rect x="560" y="80" width="480" height="24" rx="12" fill="#151E33"/>
  <rect x="120" y="290" width="160" height="14" rx="7" fill="${hue}"/>
  <text x="120" y="400" font-family="Helvetica, Arial, sans-serif" font-size="76" font-weight="700" fill="#E8ECF4" letter-spacing="-2">${name}</text>
  <rect x="120" y="450" width="380" height="14" rx="7" fill="#3A4766"/>
  <rect x="120" y="480" width="300" height="14" rx="7" fill="#26314A"/>
  <rect x="120" y="560" width="170" height="52" rx="26" fill="${hue}"/>
  <g clip-path="url(#panel)">${motif(kind, hue)}</g>
</svg>
`;
}

await mkdir(new URL("../public/projects/", import.meta.url), { recursive: true });
for (const p of projects) {
  await writeFile(new URL(`../public/projects/${p.slug}.svg`, import.meta.url), svg(p));
}
console.log(`wrote ${projects.length} placeholders`);
