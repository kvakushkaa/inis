import { useState } from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Card, Col, Row } from 'react-bootstrap';
import Button from '../Button/Button';
import QuantitySelector from '../QuantitySelector/QuantitySelector';
import starIcon from '../../assets/icons/star.svg';
import { addToCart, setStatusMessage } from '../../store/cartSlice';
import styles from './ProductCard.module.css';

function ProductCard({
  id,
  title,
  description,
  category,
  price,
  rating,
  image,
  accent = '#0F766E',
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        id,
        title,
        price,
        quantity,
      }),
    );
  };

  const handleBuyNow = () => {
    const total = (price * quantity).toFixed(2);
    dispatch(
      setStatusMessage(`Покупка: ${title} × ${quantity} на сумму ${total} Br`),
    );
  };

  return (
    <Card className={`${styles.card} h-100 w-100`}>
      <div
        className={styles.media}
        style={{
          backgroundImage: `linear-gradient(160deg, ${accent} 0%, #0f172a 100%), url(${image})`,
        }}
      >
        <Badge bg="dark" className={styles.category}>
          {category}
        </Badge>
        <div className={styles.mediaOverlay}>
          <h3 className={styles.mediaTitle}>{title}</h3>
          <p className={`${styles.mediaDescription} mb-0`}>{description}</p>
        </div>
      </div>

      <Card.Body className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <h3 className={`${styles.title} mb-0`}>{title}</h3>
          <div className={`${styles.rating} d-inline-flex align-items-center gap-1`}>
            <img src={starIcon} alt="" aria-hidden="true" />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className={`${styles.price} mb-0`}>{price.toFixed(2)} Br</p>

        <QuantitySelector initialValue={1} onChange={setQuantity} />

        <Row className="g-2 mt-auto">
          <Col xs={6}>
            <Button label="Add to Cart" variant="addToCart" onClick={handleAddToCart} />
          </Col>
          <Col xs={6}>
            <Button label="Buy Now" variant="buyNow" onClick={handleBuyNow} />
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}

ProductCard.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  rating: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  accent: PropTypes.string,
};

export default ProductCard;
