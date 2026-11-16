import { useEffect, useState } from 'react';
import logoIcon from './assets/icons/logo.svg';
import searchIcon from './assets/icons/search.svg';
import userIcon from './assets/icons/user.svg';
import cartIcon from './assets/icons/cart.svg';

const API = import.meta.env.VITE_API_URL || '/api';

export default function App() {
  const [products, setProducts] = useState([]);
  const [productId, setProductId] = useState('');
  const [author, setAuthor] = useState('Гость');
  const [text, setText] = useState(
    'Отличный UI Kit! <img src=x onerror="alert(\'XSS PoC\')">',
  );
  const [reviews, setReviews] = useState([]);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      const [productsRes, reviewsRes] = await Promise.all([
        fetch(`${API}/products`),
        fetch(`${API}/reviews`),
      ]);
      const productsData = await productsRes.json();
      const reviewsData = await reviewsRes.json();
      setProducts(productsData);
      setReviews(reviewsData);
      if (productsData[0]) {
        setProductId(productsData[0]._id || productsData[0].id);
      }
    }
    load().catch((err) => setError(err.message));
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setError('');
    setStatus('');

    const response = await fetch(`${API}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, author, text }),
    });
    const data = await response.json();

    if (!response.ok) {
      setError(data.message || 'Ошибка отправки');
      return;
    }

    setReviews((prev) => [data, ...prev]);
    setStatus('Отзыв сохранён после sanitization. XSS-теги удалены.');
    setText('');
  }

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <img src={logoIcon} alt="" className="logo" aria-hidden="true" />
          <div>
            <div className="brandName">DigiVault</div>
            <div className="brandTagline">Отзывы · ЛР11 security</div>
          </div>
        </div>
        <div className="actions" role="group" aria-label="Действия">
          <button type="button" className="iconButton" aria-label="Поиск">
            <img src={searchIcon} alt="" aria-hidden="true" />
          </button>
          <button type="button" className="iconButton" aria-label="Профиль">
            <img src={userIcon} alt="" aria-hidden="true" />
          </button>
          <button type="button" className="iconButton" aria-label="Корзина">
            <img src={cartIcon} alt="" aria-hidden="true" />
          </button>
        </div>
      </header>
      <h1>DigiVault — отзывы о товарах</h1>
      <p className="lead">ЛР11: sanitization + Helmet.js + CSP. React рендерит текст безопасно.</p>

      <section className="card">
        <h2>Новый отзыв</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="product">Товар</label>
          <select
            id="product"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            {products.map((p) => (
              <option key={p._id || p.id} value={p._id || p.id}>
                {p.name || p.title}
              </option>
            ))}
          </select>

          <label htmlFor="author">Автор</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />

          <label htmlFor="text">Отзыв о товаре</label>
          <textarea
            id="text"
            rows={4}
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />

          <button type="submit">Отправить</button>
        </form>
        {status && <p className="status">{status}</p>}
        {error && <p className="status error">{error}</p>}
      </section>

      <section className="card">
        <h2>Отзывы</h2>
        {reviews.length === 0 && <p>Пока нет отзывов.</p>}
        {reviews.map((review) => (
          <article key={review._id} className="review">
            <div className="meta">
              {review.author} · productId: {review.productId}
            </div>
            {/* text как текст — без dangerouslySetInnerHTML */}
            <div>{review.text}</div>
          </article>
        ))}
      </section>
    </div>
  );
}
