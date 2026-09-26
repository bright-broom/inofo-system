// スライド形式の独自要素（Artifact の Slides 形式で使えるアイコン・図形）を JSX で書けるようにする。
import "react";

type SlideElement = { name?: string; kind?: string; style?: import("react").CSSProperties };

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "x-icon": SlideElement & { name: string };
      "x-shape": SlideElement & { kind: string };
    }
  }
}
