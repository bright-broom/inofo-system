// 提案書・インシデント対応手順書などで共通に使う Word 部品。
import {
  AlignmentType, BorderStyle, Document, Footer, HeadingLevel, LevelFormat, PageNumber, Paragraph,
  ShadingType, Table, TableCell, TableRow, TextRun, WidthType,
} from "docx";
import type { IIndentAttributesProperties } from "docx";

const FONT = { ascii: "Yu Gothic", eastAsia: "游ゴシック", hAnsi: "Yu Gothic", cs: "Yu Gothic" };
const INK = "161513";
export const INDIGO = "3D38E0";
export const SUN = "FFED69";
export const MUTED = "55534C";
const W = 9026; // A4 本文幅（左右余白 1440）

type RunOpts = { size?: number; bold?: boolean; color?: string };
type ParaOpts = RunOpts & {
  align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  indent?: IIndentAttributesProperties;
  after?: number;
  before?: number;
};

export const run = (text: string, o: RunOpts = {}): TextRun =>
  new TextRun({ text, font: FONT, size: o.size ?? 21, bold: o.bold, color: o.color ?? INK });

export const p = (text: string | TextRun[], o: ParaOpts = {}): Paragraph =>
  new Paragraph({
    alignment: o.align,
    indent: o.indent,
    spacing: { line: 360, after: o.after ?? 100, before: o.before ?? 0 },
    children: Array.isArray(text) ? text : [run(text, o)],
  });

export const h1 = (no: string, text: string): Paragraph =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    keepNext: true,
    spacing: { before: 360, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: INK, space: 4 } },
    children: [run(`${no}　`, { size: 30, bold: true, color: INDIGO }), run(text, { size: 30, bold: true })],
  });

export const h2 = (text: string): Paragraph =>
  new Paragraph({ keepNext: true, spacing: { before: 200, after: 80 }, children: [run(text, { size: 23, bold: true })] });

export const bullet = (text: string): Paragraph =>
  new Paragraph({ numbering: { reference: "dot", level: 0 }, spacing: { line: 340, after: 60 }, children: [run(text)] });

// 番号付きの手順（1. 2. 3.）。ref ごとに番号が1から振り直される
export const step = (text: string, ref: string): Paragraph =>
  new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { line: 340, after: 60 }, children: [run(text)] });

export const blank = (): Paragraph => new Paragraph({ children: [run("")] });

const line = { style: BorderStyle.SINGLE, size: 4, color: "A8A59B" };
const borders = { top: line, bottom: line, left: line, right: line };

function cell(text: string | string[], width: number, o: { fill?: string; bold?: boolean; color?: string } = {}): TableCell {
  const lines = Array.isArray(text) ? text : [text];
  return new TableCell({
    width: { size: width, type: WidthType.DXA },
    borders,
    shading: o.fill ? { type: ShadingType.CLEAR, color: "auto", fill: o.fill } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: lines.map((t) => new Paragraph({ spacing: { line: 300 }, children: [run(t, { size: 19, bold: o.bold, color: o.color })] })),
  });
}

// rows[0] はヘッダー。firstColBold で1列目を太字に、highlightRow の行を黄色に
export function table(
  widths: number[],
  rows: string[][],
  { firstColBold = true, highlightRow }: { firstColBold?: boolean; highlightRow?: number } = {},
): Table {
  return new Table({
    width: { size: widths.reduce((a, b) => a + b, 0), type: WidthType.DXA },
    columnWidths: widths,
    rows: rows.map((r, ri) =>
      new TableRow({
        tableHeader: ri === 0,
        children: r.map((c, ci) => {
          if (ri === 0) return cell(c, widths[ci], { fill: INK, color: "FBFAF4", bold: true });
          const hl = highlightRow === ri;
          return cell(c, widths[ci], { bold: (firstColBold && ci === 0) || hl, fill: hl ? "FFF7C2" : ci === 0 ? "F1EFE5" : undefined });
        }),
      }),
    ),
  });
}

// 枠つきボックス（1セルの表）。lines は [ラベル, 本文] の配列、または文字列の配列
export function box(
  title: string,
  lines: (string | [string, string])[],
  { fill = "FFFBE0", color = INDIGO }: { fill?: string; color?: string } = {},
): Table {
  const thick = { style: BorderStyle.SINGLE, size: 18, color: INK };
  return new Table({
    width: { size: W, type: WidthType.DXA },
    columnWidths: [W],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            width: { size: W, type: WidthType.DXA },
            borders: { top: thick, bottom: thick, left: thick, right: thick },
            shading: { type: ShadingType.CLEAR, color: "auto", fill },
            margins: { top: 200, bottom: 200, left: 240, right: 240 },
            children: [
              new Paragraph({ spacing: { after: 120 }, children: [run(title, { bold: true, size: 23, color })] }),
              ...lines.map((l) =>
                new Paragraph({
                  spacing: { line: 340, after: 80 },
                  children: Array.isArray(l) ? [run(`${l[0]}　`, { bold: true }), run(l[1])] : [run(l)],
                }),
              ),
            ],
          }),
        ],
      }),
    ],
  });
}

// A4・表紙はフッターなし。stepRefs は番号付き手順に使う ref の一覧
export function makeDoc(footerLabel: string, children: (Paragraph | Table)[], { stepRefs = [] }: { stepRefs?: string[] } = {}): Document {
  return new Document({
    styles: {
      default: { document: { run: { font: FONT, size: 21 } } },
      paragraphStyles: [
        { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { font: FONT, size: 30, bold: true }, paragraph: { outlineLevel: 0 } },
      ],
    },
    numbering: {
      config: [
        { reference: "dot", levels: [{ level: 0, format: LevelFormat.BULLET, text: "・", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 280 } } } }] },
        ...stepRefs.map((reference) => ({
          reference,
          levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 420, hanging: 360 } } } }],
        })),
      ],
    },
    sections: [
      {
        properties: { page: { size: { width: 11906, height: 16838 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } }, titlePage: true },
        footers: {
          default: new Footer({
            children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ children: [`${footerLabel}　`, PageNumber.CURRENT], font: FONT, size: 16, color: MUTED })] })],
          }),
          first: new Footer({ children: [new Paragraph({ children: [] })] }),
        },
        children,
      },
    ],
  });
}
