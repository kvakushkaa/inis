import { useState } from 'react';
import styles from './QuantitySelector.module.css';

export default function QuantitySelector({
  initialValue = 1,
  min = 1,
  max = 99,
  onChange,
}) {
  const [quantity, setQuantity] = useState(initialValue);

  const updateQuantity = (nextValue) => {
    const parsed = Number(nextValue);
    if (Number.isNaN(parsed)) {
      return;
    }

    const clamped = Math.min(max, Math.max(min, parsed));
    setQuantity(clamped);
    onChange?.(clamped);
  };

  return (
    <div className={styles.selector} role="group" aria-label="Количество товара">
      <button
        type="button"
        className={styles.control}
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= min}
        aria-label="Уменьшить количество"
      >
        −
      </button>
      <input
        className={styles.value}
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={(event) => updateQuantity(event.target.value)}
        aria-label="Количество"
      />
      <button
        type="button"
        className={styles.control}
        onClick={() => updateQuantity(quantity + 1)}
        disabled={quantity >= max}
        aria-label="Увеличить количество"
      >
        +
      </button>
    </div>
  );
}
