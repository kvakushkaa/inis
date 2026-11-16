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
  onQuickView,
}) {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);

  const product = { id, title, description, category, price, rating, image, accent };

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
    <Card className={`${styles.card} h-100 w-100`} data-testid={`product-card-${id}`}>
      <div
        className={styles.media}
        style={{
          backgroundImage: `linear-gradient(160deg, ${accent} 0%, #0f172a 100%), url(${image})`,
        }}
        role="img"
        aria-label={`Изображение товара ${title}`}
      >
        <Badge bg="dark" className={styles.category}>
          {category}
        </Badge>
        <div className={styles.mediaOverlay} aria-hidden="true">
          <p className={styles.mediaTitle}>{title}</p>
          <p className={`${styles.mediaDescription} mb-0`}>{description}</p>
        </div>
      </div>

      <Card.Body className="d-flex flex-column gap-3">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <h3 className={`${styles.title} mb-0`}>{title}</h3>
          <div
            className={`${styles.rating} d-inline-flex align-items-center gap-1`}
            role="img"
            aria-label={`Рейтинг ${rating.toFixed(1)} из 5`}
          >
            <img src={starIcon} alt="" aria-hidden="true" />
            <span aria-hidden="true">{rating.toFixed(1)}</span>
          </div>
        </div>

        <p className={`${styles.price} mb-0`} data-testid={`product-price-${id}`}>
          <span className="visually-hidden">Цена: </span>
          {price.toFixed(2)} Br
        </p>

        <QuantitySelector initialValue={1} onChange={setQuantity} />

        <Row className="g-2 mt-auto">
          <Col xs={12}>
            <Button
              label="Быстрый просмотр"
              variant="buyNow"
              onClick={() => onQuickView?.(product)}
              data-testid={`quick-view-${id}`}
            />
          </Col>
          <Col xs={6}>
            <Button
              label="Добавить в корзину"
              variant="addToCart"
              onClick={handleAddToCart}
              data-testid={`add-to-cart-${id}`}
            />
          </Col>
          <Col xs={6}>
            <Button label="Купить" variant="buyNow" onClick={handleBuyNow} />
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
  onQuickView: PropTypes.func,
};

export default ProductCard;
