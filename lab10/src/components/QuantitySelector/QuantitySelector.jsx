import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Form, InputGroup } from 'react-bootstrap';
import styles from './QuantitySelector.module.css';

function QuantitySelector({
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
    <InputGroup className={styles.selector} aria-label="Количество товара">
      <Button
        type="button"
        variant="light"
        className={styles.control}
        onClick={() => updateQuantity(quantity - 1)}
        disabled={quantity <= min}
        aria-label="Уменьшить количество"
      >
        −
      </Button>
      <Form.Control
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={(event) => updateQuantity(event.target.value)}
        aria-label="Количество"
        className={`${styles.value} text-center`}
      />
      <Button
        type="button"
        variant="light"
        className={styles.control}
        onClick={() => updateQuantity(quantity + 1)}
        disabled={quantity >= max}
        aria-label="Увеличить количество"
      >
        +
      </Button>
    </InputGroup>
  );
}

QuantitySelector.propTypes = {
  initialValue: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func,
};

export default QuantitySelector;
