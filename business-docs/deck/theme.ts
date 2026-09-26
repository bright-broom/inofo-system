// スライド共通の色・書体・よく使うスタイル。
import type { CSSProperties } from "react";

export const C = {
  ink: "#161513",
  paper: "#FBFAF4",
  white: "#FFFFFB",
  sun: "#FFED69",
  indigo: "#3D38E0",
  red: "#C8322B",
  muted: "#55534C",
  faint: "#77746A",
  faintOnDark: "#9A968A",
  onDark: "#D9D6CC",
  pill: "#EFEDE3",
  band: "#F1EFE5",
  darkCard: "#23221F",
  darkLine: "#3A3833",
  darkPill: "#34332E",
} as const;

export const BODY_FONT = "'Zen Maru Gothic', Arial, sans-serif";
const HEAD_FONT = "'Dela Gothic One', Arial, sans-serif";

// 見出し用の書体（太さはDela Gothic Oneの標準）
export const head: CSSProperties = { fontFamily: HEAD_FONT, fontWeight: 400 };

// 本文スライド（生成りの背景・下にフッター）
export const paperSection: CSSProperties = {
  background: C.paper,
  color: C.ink,
  fontFamily: BODY_FONT,
  padding: "128px 128px 160px",
  display: "flex",
  flexDirection: "column",
  gap: "48px",
};

// 白いカード（太い黒枠）
export const card = (radius: string, padding: string): CSSProperties => ({
  background: C.white,
  border: `3px solid ${C.ink}`,
  borderRadius: radius,
  padding,
});

export const row: CSSProperties = { display: "flex", flexDirection: "row" };
export const column = (gap: string): CSSProperties => ({ display: "flex", flexDirection: "column", gap });
export const center: CSSProperties = { display: "flex", alignItems: "center", justifyContent: "center" };
