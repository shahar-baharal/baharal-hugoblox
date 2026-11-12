// Inline Markdown for a block's titles and short texts, the one copy every
// block imports: **bold**, *italic*, `code`, [link](url). Content is written
// by the site owner, so HTML in it passes through.
export function renderInline(text) {
  if (!text) return "";
  return String(text)
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/g, "<em>$1</em>")
    .replace(
      /`(.*?)`/g,
      '<code class="px-1.5 py-0.5 rounded font-mono text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">$1</code>',
    )
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="underline underline-offset-2">$1</a>');
}
