import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { Badge, Button as BsButton } from 'react-bootstrap';
import cartIcon from '../../assets/icons/cart.svg';
import { selectCartTotalQuantity } from '../../store/cartSlice';
import styles from './CartIcon.module.css';

function CartIcon({ onClick }) {
  const count = useSelector(selectCartTotalQuantity);

  return (
    <BsButton
      type="button"
      variant="light"
      className={`${styles.button} position-relative d-inline-flex align-items-center justify-content-center`}
      onClick={onClick}
      aria-label={`Корзина, товаров: ${count}`}
    >
      <img src={cartIcon} alt="" className={styles.icon} aria-hidden="true" />
      {count > 0 && (
        <Badge bg="warning" text="dark" className={styles.badge}>
          {count}
        </Badge>
      )}
    </BsButton>
  );
}

CartIcon.propTypes = {
  onClick: PropTypes.func,
};

export default CartIcon;
