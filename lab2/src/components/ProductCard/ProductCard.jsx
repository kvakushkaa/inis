import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../Button/Button';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import starIcon from '../../assets/icons/star.svg';
import styles from './ProductCard.module.css';

function ProductCard({
  title,
  description,
  category,
  price,
  rating,
  image,
  accent = '#0F766E',
  onAddToCart,
  onBuyNow,
}) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart?.({ title, price, quantity });
  };

  const handleBuyNow = () => {
    onBuyNow?.({ title, price, quantity });
  };

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
            <img src={starIcon} alt="" aria-hidden="true" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className={styles.price}>{price.toFixed(2)} Br</p>

        <div className={styles.controls}>
          <QuantitySelector
            initialValue={1}
            onChange={setQuantity}
          />
        </div>

        <div className={styles.actions}>
          <Button
            label="Add to Cart"
            variant="addToCart"
            onClick={handleAddToCart}
          />
          <Button
            label="Buy Now"
            variant="buyNow"
            onClick={handleBuyNow}
          />
        </div>
      </div>
    </article>
  );
}

ProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  accent: PropTypes.string,
  onAddToCart: PropTypes.func,
  onBuyNow: PropTypes.func,
};

export default ProductCard;
