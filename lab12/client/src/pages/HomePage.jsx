import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const API = import.meta.env.VITE_API_URL || '/api';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${API}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch((err) => setError(err.message));
  }, []);

  return (
    <main>
      <h1>Каталог цифровых товаров</h1>
      <p className="lead">
        DigiVault · ЛР12. Средние цены по категориям смотрите на странице{' '}
        <Link to="/analytics">/analytics</Link>.
      </p>

      {error && <p className="error">{error}</p>}

      <section className="grid" aria-label="Список товаров">
        {products.map((product) => (
          <article key={product._id} className="product">
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p className="price">{Number(product.price).toFixed(2)} Br</p>
          </article>
        ))}
      </section>
    </main>
  );
}
