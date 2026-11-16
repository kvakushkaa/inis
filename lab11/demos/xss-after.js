const list = document.getElementById('list');
const statusEl = document.getElementById('status');

function appendReview(author, text) {
  const article = document.createElement('article');
  article.className = 'review';

  const meta = document.createElement('div');
  meta.className = 'meta';
  meta.textContent = author;

  const body = document.createElement('div');
  // Безопасно: textContent экранирует HTML
  body.textContent = text;

  article.append(meta, body);
  list.prepend(article);
}

document.getElementById('form').addEventListener('submit', async (event) => {
  event.preventDefault();
  const author = document.getElementById('author').value;
  const text = document.getElementById('text').value;

  const response = await fetch('/api/reviews', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ productId: 'ui-kit-pro', author, text }),
  });

  const data = await response.json();

  if (!response.ok) {
    statusEl.textContent = data.message || 'Отзыв отклонён после sanitization';
    statusEl.style.color = '#b45309';
    return;
  }

  statusEl.textContent = 'XSS-нагрузка обезврежена. alert() не сработал.';
  statusEl.style.color = '#166534';
  appendReview(data.author, data.text);
});
