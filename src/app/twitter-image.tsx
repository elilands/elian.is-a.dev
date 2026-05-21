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
            "radial-gradient(circle at 20% 20%, rgba(232, 213, 163, 0.28), transparent 35%), radial-gradient(circle at 78% 26%, rgba(201, 184, 232, 0.32), transparent 32%), linear-gradient(135deg, #101019 0%, #232038 58%, #34304E 100%)",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <div
            style={{
              width: "168px",
              height: "2px",
              background: "linear-gradient(90deg, #E8D5A3, #A8C4D8)",
            }}
          />
          <div style={{ fontSize: 28, letterSpacing: "0.3em", textTransform: "uppercase", color: "#B0A8C8" }}>
            Portfolio / Certifications / Process
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
            <span>Omyu</span>
            <span>Study Edu Cout</span>
            <span>Cartia</span>
            <span>Fixit Ya</span>
            <span>Mexico City</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
