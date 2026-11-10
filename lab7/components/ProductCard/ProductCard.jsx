import Button from '../Button/Button';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import styles from './ProductCard.module.css';

export default function ProductCard({
  id,
  title,
  description,
  category,
  price,
  rating,
  image,
  accent = '#0F766E',
  inStock = true,
}) {
  return (
    <article className={styles.card}>
      <div
        className={styles.media}
        style={{
          backgroundImage: `linear-gradient(160deg, ${accent} 0%, #0f172a 100%), url(${image})`,
        }}
      >
        <span className={styles.category}>{category}</span>
        <div className={styles.mediaOverlay}>
          <h3 className={styles.mediaTitle}>{title}</h3>
          <p className={styles.mediaDescription}>{description}</p>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.rating}>
            <img src="/icons/star.svg" alt="" aria-hidden="true" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className={styles.price}>{price.toFixed(2)} Br</p>
        <p className={styles.stock}>{inStock ? 'В наличии' : 'Нет в наличии'}</p>

        <QuantitySelector />

        <div className={styles.actions}>
          <Button label="Add to Cart" variant="addToCart" />
          <Button label="Details" variant="buyNow" href={`/products/${id}`} />
        </div>
      </div>
    </article>
  );
}
