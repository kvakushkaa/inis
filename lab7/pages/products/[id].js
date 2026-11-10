import Link from 'next/link';
import Button from '../../components/Button/Button';
import QuantitySelector from '../../components/QuantitySelector/QuantitySelector';
import { getAllProducts, getProductById } from '../../data/products';
import styles from '../../styles/Products.module.css';

export default function ProductPage({ product, builtAt, strategy }) {
  if (!product) {
    return <p>Товар не найден</p>;
  }

  return (
    <>
      <Link href="/products" className={styles.back}>
        ← Назад к каталогу
      </Link>

      <div className={styles.detail}>
        <div
          className={styles.media}
          style={{
            backgroundImage: `linear-gradient(160deg, ${product.accent} 0%, #0f172a 100%), url(${product.image})`,
          }}
        >
          <span className={styles.category}>{product.category}</span>
        </div>

        <div className={styles.info}>
          <h1>{product.title}</h1>
          <p className={styles.rating}>
            <img src="/icons/star.svg" alt="" width={16} height={16} aria-hidden="true" />
            {product.rating.toFixed(1)}
          </p>
          <p className={styles.price}>{product.price.toFixed(2)} Br</p>
          <p className={`${styles.stock} ${product.inStock ? styles.stockOk : styles.stockOut}`}>
            {product.inStock ? 'В наличии' : 'Нет в наличии'}
          </p>
          <p className={styles.description}>{product.fullDescription}</p>

          <QuantitySelector />

          <div className={styles.purchase}>
            <Button label="Add to Cart" variant="addToCart" />
            <Button label="Buy Now" variant="buyNow" />
          </div>

          <p className={styles.buildNote}>
            Стратегия: <strong>{strategy}</strong> (getStaticProps + getStaticPaths)
            <br />
            Страница сгенерирована при сборке: <strong>{builtAt}</strong>
          </p>
        </div>
      </div>
    </>
  );
}

export async function getStaticPaths() {
  const products = getAllProducts();

  const paths = products.map((product) => ({
    params: { id: product.id },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const product = getProductById(params.id);

  if (!product) {
    return { notFound: true };
  }

  const builtAt = new Date().toLocaleString('ru-RU', {
    timeZone: 'Europe/Minsk',
    hour12: false,
  });

  return {
    props: {
      product,
      builtAt,
      strategy: 'SSG',
    },
  };
}
