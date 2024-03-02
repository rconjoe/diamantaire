export function markdownToPlainText(markdown) {
  // Remove HTML tags
  let plainText = markdown.replace(/<\/?[^>]+(>|$)/g, '');

  // Remove images ![alt text](URL "Title")
  plainText = plainText.replace(/!\[[^\]]*\]\((.*?)\s*("(?:.*[^"])")?\s*\)/g, '');

  // Remove links [text](URL)
  plainText = plainText.replace(/\[([^\]]+)\]\((.*?)\)/g, '$1');

  // Remove inline code and code blocks
  plainText = plainText.replace(/(```[\s\S]*?```|`[^`]*`)/g, '');

  // Remove emphasis and strong emphasis
  plainText = plainText.replace(/(\*\*|__)(.*?)\1/g, '$2');
  plainText = plainText.replace(/(\*|_)(.*?)\1/g, '$2');

  // Remove headers
  plainText = plainText.replace(/(#{1,6}\s)(.*)/g, '$2');

  // Remove blockquotes
  plainText = plainText.replace(/^\s*>+\s?/gm, '');

  // Remove lists (unordered and ordered)
  plainText = plainText.replace(/^\s*[*\-+]\s?/gm, ''); // Corrected unnecessary escape
  plainText = plainText.replace(/^\s*\d+\.\s?/gm, '');

  // Remove horizontal rules
  plainText = plainText.replace(/^-{3,}\s*$/gm, '');

  // Remove additional whitespace
  plainText = plainText.replace(/\s{2,}/g, ' ').trim();

  return plainText;
}
