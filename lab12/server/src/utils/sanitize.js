const sanitizeHtml = require('sanitize-html');

/**
 * Очистка пользовательского ввода (отзыв о товаре) от XSS-нагрузок.
 * Удаляет script/iframe/события on* и опасные протоколы.
 */
function sanitizeReviewText(input) {
  const raw = String(input ?? '');

  return sanitizeHtml(raw, {
    allowedTags: [],
    allowedAttributes: {},
    disallowedTagsMode: 'discard',
  }).trim();
}

module.exports = { sanitizeReviewText };
