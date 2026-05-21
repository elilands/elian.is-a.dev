import { ImageResponse } from "next/og";
import { siteName } from "@/lib/seo";

export const size = {
  width: 180,
  height: 180,
};

export const contentType = "image/png";

export default function AppleTouchIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #08080B 0%, #171525 55%, #2A2742 100%)",
          color: "#F7F4EF",
          fontSize: 72,
          fontWeight: "bold",
          fontFamily: "Arial, sans-serif",
        }}
      >
        EM
      </div>
    ),
    {
      ...size,
    }
  );
}
