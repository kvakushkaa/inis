import ProductCard from '../../components/ProductCard/ProductCard';
import { getAllProducts } from '../../data/products';
import styles from '../../styles/Products.module.css';

export default function ProductsPage({ products, renderedAt, strategy }) {
  return (
    <>
      <section className={styles.hero}>
        <h1>Интернет-магазин цифровых товаров</h1>
        <p>UI-киты, иконки и аудиопресеты с мгновенной доставкой.</p>
        <p className={styles.meta}>
          Стратегия: <strong>{strategy}</strong>
          <span className={styles.badge}>getServerSideProps</span>
          <br />
          Страница сгенерирована на сервере: <strong>{renderedAt}</strong>
        </p>
      </section>

      <section>
        <div className={styles.catalogHeader}>
          <h2>Каталог</h2>
          <p>Актуальные цены и наличие на момент запроса</p>
        </div>

        <div className={styles.grid}>
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </section>
    </>
  );
}

export async function getServerSideProps() {
  // Имитация запроса к API при каждом обращении к странице
  await new Promise((resolve) => setTimeout(resolve, 50));

  const now = new Date();
  const products = getAllProducts().map((product, index) => ({
    ...product,
    // «живая» цена: небольшая надбавка от минут/секунд, чтобы показать SSR
    price: Number(
      (product.price + ((now.getSeconds() + index) % 5) * 0.1).toFixed(2),
    ),
    inStock: true,
    checkedAt: now.toISOString(),
  }));

  const renderedAt = now.toLocaleString('ru-RU', {
    timeZone: 'Europe/Minsk',
    hour12: false,
  });

  return {
    props: {
      products,
      renderedAt,
      strategy: 'SSR',
    },
  };
}
