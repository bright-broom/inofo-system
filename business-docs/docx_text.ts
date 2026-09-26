// Word ファイルの本文テキストを標準出力に書き出す（snapshot.py から呼ぶ）。
// 使い方: node docx_text.ts <ファイル.docx>
import mammoth from "mammoth";

const file = process.argv[2];
if (!file) throw new Error("使い方: node docx_text.ts <ファイル.docx>");
const { value } = await mammoth.extractRawText({ path: file });
process.stdout.write(value);
