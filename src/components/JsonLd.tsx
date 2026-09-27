// 構造化データを <script type="application/ld+json"> として出力する。
// < をエスケープして、文字列中の </script> でタグが閉じないようにする。
export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}
