import { ImageResponse } from "next/og";
import { siteDescription, siteName } from "@/lib/seo";

export const alt = `${siteName} — Full-Stack Product Engineer`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          color: "#F7F4EF",
          background:
            "radial-gradient(circle at 20% 20%, rgba(201, 184, 232, 0.34), transparent 36%), radial-gradient(circle at 80% 30%, rgba(168, 196, 216, 0.24), transparent 30%), linear-gradient(135deg, #08080B 0%, #171525 55%, #2A2742 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              width: "168px",
              height: "2px",
              background: "linear-gradient(90deg, #E8D5A3, #C9B8E8)",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: "0.3em", textTransform: "uppercase", color: "#A09D98" }}>
            Portfolio / Product / Systems
          </div>
          <div style={{ fontSize: 92, lineHeight: 0.94, fontWeight: 700, maxWidth: "10ch" }}>
            Elian Mejia
          </div>
          <div style={{ fontSize: 34, lineHeight: 1.2, color: "#DDD8EE", maxWidth: "18ch" }}>
            Full-Stack Product Engineer
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "14px", maxWidth: "52%" }}>
          <div style={{ fontSize: 24, lineHeight: 1.45, color: "#F0EDE8" }}>
            {siteDescription}
          </div>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", fontSize: 18, color: "#C9A96E" }}>
            <span>Next.js</span>
            <span>TypeScript</span>
            <span>React</span>
            <span>AI systems</span>
            <span>Business-aware UX</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
