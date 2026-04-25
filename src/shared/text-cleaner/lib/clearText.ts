export const getCleanText = (dirtyText: string): string => {
  // 1. Замена \r\n и других пробельных символов на обычный пробел
  let cleaned = dirtyText.replace(/[\r\n\t]+/g, ' ');

  // 2. Удаление HTML-тегов (включая <b>, <i>, <br> и т.д.)
  cleaned = cleaned.replace(/<[^>]*>/g, '');

  // 3. Замена нескольких пробелов подряд на один
  cleaned = cleaned.replace(/\s+/g, ' ').trim();

  // 4. Декодирование HTML-сущностей (например, &amp;, &lt;, &gt;)
  cleaned = decodeHtmlEntities(cleaned);

  return cleaned;
};

// Декодирование HTML-сущностей
const decodeHtmlEntities = (text: string): string => {
  const entities: Record<string, string> = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&nbsp;': ' ',
  };

  return text.replace(/&[a-z0-9]+;/gi, (match) => entities[match] || match);
};
