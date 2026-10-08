import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// Same "d" mark as app/icon.svg, scaled to 180px (iOS adds its own rounding).
export default function AppleIcon() {
  const u = 180 / 32;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", backgroundColor: "#ff8a3d" }}>
        <div
          style={{
            position: "absolute",
            left: (14 - 5.6 - 1.6) * u,
            top: (19 - 5.6 - 1.6) * u,
            width: (5.6 + 1.6) * 2 * u,
            height: (5.6 + 1.6) * 2 * u,
            borderRadius: 999,
            border: `${3.2 * u}px solid #0a0f1c`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 18.4 * u,
            top: 6.5 * u,
            width: 3.2 * u,
            height: 18.1 * u,
            borderRadius: 1.6 * u,
            backgroundColor: "#0a0f1c",
          }}
        />
      </div>
    ),
    size,
  );
}
