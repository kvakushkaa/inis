import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import cartIcon from '../../assets/icons/cart.svg';
import { selectCartTotalQuantity } from '../../store/cartSlice';
import styles from './CartIcon.module.css';

function CartIcon({ onClick }) {
  const count = useSelector(selectCartTotalQuantity);

  return (
    <button
      type="button"
      className={styles.button}
      onClick={onClick}
      aria-label={`Корзина, товаров: ${count}`}
    >
      <img src={cartIcon} alt="" className={styles.icon} aria-hidden="true" />
      {count > 0 && <span className={styles.badge}>{count}</span>}
    </button>
  );
}

CartIcon.propTypes = {
  onClick: PropTypes.func,
};

export default CartIcon;
