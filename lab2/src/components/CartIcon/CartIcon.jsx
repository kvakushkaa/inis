import PropTypes from 'prop-types';
import cartIcon from '../../assets/icons/cart.svg';
import styles from './CartIcon.module.css';

function CartIcon({ count = 0, onClick }) {
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
  count: PropTypes.number,
  onClick: PropTypes.func,
};

export default CartIcon;
