import katex from "katex";

export function renderMathInText(text: string | null | undefined): string {
  if (!text) return "";

  let result = text;
  
  // Render block math: $$...$$
  result = result.replace(/\$\$([\s\S]*?)\$\$/g, (match, math) => {
    try {
      return katex.renderToString(math, { displayMode: true, throwOnError: false });
    } catch (e) {
      console.warn("KaTeX block rendering error:", e);
      return match;
    }
  });

  // Render inline math: $...$
  result = result.replace(/\$([\s\S]*?)\$/g, (match, math) => {
    try {
      return katex.renderToString(math, { displayMode: false, throwOnError: false });
    } catch (e) {
      console.warn("KaTeX inline rendering error:", e);
      return match;
    }
  });

  // Basic formatting: Newlines to paragraphs and breaks
  result = result
    .split(/\n\n+/)
    .map(p => `<p class="my-2">${p.replace(/\n/g, '<br/>')}</p>`)
    .join("");

  // Fix up formatting for specific bolding if any: **text** -> <strong>text</strong>
  result = result.replace(/\*\*([\s\S]*?)\*\*/g, '<strong>$1</strong>');

  return result;
}
