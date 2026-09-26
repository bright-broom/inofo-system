// スライドの部品。各スライド（slides/*.tsx）はこれらを組み合わせて中身だけを書く。
import type { CSSProperties, ReactNode } from "react";
import { C, card, center, column, head, row } from "./theme.ts";

export type SlideProps = { page: number };

// スライド1枚（section）。notes は発表者メモ（最後の aside）
export function Slide(props: { id: string; style: CSSProperties; transition?: "fade"; notes: string; children: ReactNode }) {
  return (
    <section id={props.id} data-transition={props.transition} style={props.style}>
      {props.children}
      <aside>{props.notes}</aside>
    </section>
  );
}

export function Eyebrow({ children, color = C.indigo }: { children: ReactNode; color?: string }) {
  return <p style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "6px", color }}>{children}</p>;
}

// 小見出し＋大見出し
export function Title(props: { eyebrow: string; eyebrowColor?: string; size?: string; gap?: string; children: ReactNode }) {
  return (
    <div style={column(props.gap ?? "12px")}>
      <Eyebrow color={props.eyebrowColor}>{props.eyebrow}</Eyebrow>
      <h2 style={{ ...head, fontSize: props.size ?? "72px", lineHeight: 1.2 }}>{props.children}</h2>
    </div>
  );
}

// 左下の資料名と右下のページ番号。left で左側の文言を差し替えられる
export function Footer(props: { page: number; color?: string; left?: { text: string; width: string; color: string } }) {
  const color = props.color ?? C.faint;
  const left = props.left ?? { text: "ラクシス｜サービスご説明資料", width: "900px", color };
  return (
    <>
      <p style={{ position: "absolute", left: "128px", bottom: "64px", width: left.width, fontSize: "24px", color: left.color }}>{left.text}</p>
      <p style={{ position: "absolute", right: "128px", bottom: "64px", width: "200px", fontSize: "24px", color, textAlign: "right" }}>{props.page}</p>
    </>
  );
}

// 角丸の小さなラベル
export function Pill({ style, children }: { style: CSSProperties; children: ReactNode }) {
  return (
    <div style={row}>
      <p style={{ borderRadius: "999px", ...style }}>{children}</p>
    </div>
  );
}

// カードとカードの間の矢印
export function Arrow() {
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <x-shape kind="arrow-right" style={{ background: C.ink, width: "56px", height: "32px" }}></x-shape>
    </div>
  );
}

// 丸いバッジの中のアイコン
export function IconBadge(props: { name: string; size: string; iconSize: string; background: string; color: string; radius: string; border?: string }) {
  return (
    <div style={{ width: props.size, height: props.size, ...center, background: props.background, ...(props.border ? { border: props.border } : {}), borderRadius: props.radius }}>
      <x-icon name={props.name} style={{ color: props.color, width: props.iconSize, height: props.iconSize }}></x-icon>
    </div>
  );
}

// チェックマーク付きの1行
export function CheckItem({ children, background, color }: { children: ReactNode; background: string; color: string }) {
  return (
    <div style={{ ...row, gap: "12px", alignItems: "center" }}>
      <IconBadge name="Check" size="32px" iconSize="22px" background={background} color={color} radius="50%" />
      <p style={{ fontSize: "26px", lineHeight: 1.4 }}>{children}</p>
    </div>
  );
}

// 白いカードの外枠
export function Card(props: { radius: string; padding: string; gap: string; flex?: boolean; extra?: CSSProperties; children: ReactNode }) {
  return <div style={{ ...(props.flex ? { flex: 1 } : {}), ...column(props.gap), ...card(props.radius, props.padding), ...props.extra }}>{props.children}</div>;
}

// 2列の表（ヘッダー行＋帯のある本文行）
export function BandedRows({ rows, render }: { rows: string[][]; render: (r: string[]) => ReactNode }) {
  return <>{rows.map((r, i) => (i % 2 === 1 ? <tr key={r[0]} style={{ background: C.band }}>{render(r)}</tr> : <tr key={r[0]}>{render(r)}</tr>))}</>;
}
