import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

const fontsDir = join(process.cwd(), "assets/fonts");
const fonts = Promise.all([
  readFile(join(fontsDir, "BricolageGrotesque-Bold.ttf")),
  readFile(join(fontsDir, "Geist-Regular.ttf")),
  readFile(join(fontsDir, "GeistMono-Medium.ttf")),
]);

const c = {
  bg: "#070a13",
  line: "#1c2640",
  fg: "#e8ecf4",
  muted: "#98a3bb",
  accent: "#ff8a3d",
  onAccent: "#0a0f1c",
};

type OgOptions = {
  eyebrow: string;
  title: string;
  subtitle: string;
  footer: string[];
  badge?: { label: string; color: string };
};

export async function renderOgImage({ eyebrow, title, subtitle, footer, badge }: OgOptions) {
  const [display, sans, mono] = await fonts;
  const titleSize = title.length > 18 ? 88 : 112;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: c.bg,
          backgroundImage: `radial-gradient(circle at 92% 0%, rgba(255,138,61,0.28), rgba(255,138,61,0) 55%)`,
          color: c.fg,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 13,
                backgroundColor: c.accent,
                display: "flex",
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 13,
                  top: 21,
                  width: 19,
                  height: 19,
                  borderRadius: 999,
                  border: `5px solid ${c.onAccent}`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 30,
                  top: 10,
                  width: 5,
                  height: 30,
                  borderRadius: 3,
                  backgroundColor: c.onAccent,
                }}
              />
            </div>
            <div style={{ fontFamily: "Geist Mono", fontSize: 24, letterSpacing: 3, color: c.muted, textTransform: "uppercase" }}>
              {eyebrow}
            </div>
          </div>
          {badge ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "8px 18px",
                borderRadius: 999,
                border: `2px solid ${badge.color}55`,
                color: badge.color,
                fontFamily: "Geist Mono",
                fontSize: 22,
                letterSpacing: 2,
                textTransform: "uppercase",
              }}
            >
              <div style={{ width: 10, height: 10, borderRadius: 999, backgroundColor: badge.color }} />
              {badge.label}
            </div>
          ) : null}
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontFamily: "Bricolage Grotesque",
              fontSize: titleSize,
              lineHeight: 1,
              letterSpacing: -3,
            }}
          >
            {title}
          </div>
          <div style={{ marginTop: 28, fontSize: 40, lineHeight: 1.3, color: c.muted, maxWidth: 1000 }}>
            {subtitle}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderTop: `2px solid ${c.line}`,
            paddingTop: 28,
            fontFamily: "Geist Mono",
            fontSize: 22,
            color: c.muted,
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            {footer.map((f) => (
              <div key={f}>{f}</div>
            ))}
          </div>
          <div style={{ color: c.accent }}>Derrick Omanwa</div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Bricolage Grotesque", data: display, weight: 700, style: "normal" },
        { name: "Geist", data: sans, weight: 400, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
