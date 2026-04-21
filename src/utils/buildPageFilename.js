export function buildPageFilename(template, pageNum, total) {
  const t = total || "?";
  const padded =
    typeof t === "number"
      ? String(pageNum).padStart(String(t).length, "0")
      : String(pageNum).padStart(3, "0");

  return (
    (template || "page_{padded}")
      .replace(/\{page\}/g, pageNum)
      .replace(/\{padded\}/g, padded)
      .replace(/\{total\}/g, t)
      .replace(/\.png$/i, "")
      .trim() || `page_${padded}`
  );
}