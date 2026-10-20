import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './QuantitySelector.module.css';

function QuantitySelector({
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
}) {
  const [quantity, setQuantity] = useState(initialValue);

  const updateQuantity = (nextValue) => {
    const clamped = Math.min(max, Math.max(min, nextValue));
    setQuantity(clamped);
    onChange?.(clamped);
  };

  const handleDecrement = () => updateQuantity(quantity - 1);
  const handleIncrement = () => updateQuantity(quantity + 1);

  return (
    <div className={styles.selector} role="group" aria-label="Количество товара">
      <button
        type="button"
        className={styles.control}
        onClick={handleDecrement}
        disabled={quantity <= min}
        aria-label="Уменьшить количество"
      >
        −
      </button>
      <span className={styles.value} aria-live="polite">
        {quantity}
      </span>
      <button
        type="button"
        className={styles.control}
        onClick={handleIncrement}
        disabled={quantity >= max}
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
}

QuantitySelector.propTypes = {
  initialValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

export default QuantitySelector;
