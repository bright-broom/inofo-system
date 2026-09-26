import { ImageResponse } from "next/og";

// SNS 共有用の画像（1200x630）。ビルド時に静的生成される。
// 既定フォントは日本語グリフを持たないため、文字は英数字のみにしている。
export const alt = "raku-sys — IT support team for small businesses";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffed69",
          padding: 72,
          fontFamily: "sans-serif",
          color: "#111",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              border: "5px solid #111",
              borderRadius: 18,
              background: "#fff",
              padding: "10px 26px",
              fontSize: 44,
              fontWeight: 800,
              boxShadow: "8px 8px 0 #111",
            }}
          >
            raku-sys
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ fontSize: 82, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>Your outsourced</div>
          <div style={{ display: "flex", fontSize: 82, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            <span style={{ background: "#111", color: "#ffed69", padding: "0 18px", borderRadius: 14 }}>IT team.</span>
          </div>
        </div>
        <div style={{ display: "flex", gap: 18 }}>
          {["3 simple plans", "from JPY 30,000 / mo", "Evenings & weekends"].map((t) => (
            <div key={t} style={{ display: "flex", background: "#fff", border: "4px solid #111", borderRadius: 999, padding: "12px 28px", fontSize: 30, fontWeight: 700 }}>
              {t}
            </div>
          ))}
        </div>
      </div>
    ),
    size,
  );
}
