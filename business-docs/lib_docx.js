// 提案書・インシデント対応手順書などで共通に使う Word 部品。
const {
  Document, Paragraph, TextRun, Table, TableRow, TableCell, WidthType, AlignmentType,
  BorderStyle, ShadingType, Footer, PageNumber, HeadingLevel, LevelFormat,
} = require("docx");

const FONT = { ascii: "Yu Gothic", eastAsia: "游ゴシック", hAnsi: "Yu Gothic", cs: "Yu Gothic" };
const INK = "161513";
const INDIGO = "3D38E0";
const SUN = "FFED69";
const MUTED = "55534C";
const W = 9026; // A4 本文幅（左右余白 1440）

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: o.size ?? 21, bold: o.bold, color: o.color ?? INK });

const p = (text, o = {}) =>
  new Paragraph({
    alignment: o.align,
    indent: o.indent,
    spacing: { line: 360, after: o.after ?? 100, before: o.before ?? 0 },
    children: Array.isArray(text) ? text : [run(text, o)],
  });

const h1 = (no, text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    keepNext: true,
    spacing: { before: 360, after: 160 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: INK, space: 4 } },
    children: [run(`${no}　`, { size: 30, bold: true, color: INDIGO }), run(text, { size: 30, bold: true })],
  });

const h2 = (text) =>
  new Paragraph({ keepNext: true, spacing: { before: 200, after: 80 }, children: [run(text, { size: 23, bold: true })] });

const bullet = (text) =>
  new Paragraph({ numbering: { reference: "dot", level: 0 }, spacing: { line: 340, after: 60 }, children: [run(text)] });

// 番号付きの手順（1. 2. 3.）。ref ごとに番号が1から振り直される
const step = (text, ref) =>
  new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { line: 340, after: 60 }, children: [run(text)] });

const blank = () => new Paragraph({ children: [run("")] });

const line = { style: BorderStyle.SINGLE, size: 4, color: "A8A59B" };
const borders = { top: line, bottom: line, left: line, right: line };

function cell(text, width, o = {}) {
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
function table(widths, rows, { firstColBold = true, highlightRow } = {}) {
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
function box(title, lines, { fill = "FFFBE0", color = INDIGO } = {}) {
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
function makeDoc(footerLabel, children, { stepRefs = [] } = {}) {
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

module.exports = { FONT, INK, INDIGO, SUN, MUTED, W, run, p, h1, h2, bullet, step, blank, cell, table, box, makeDoc };
