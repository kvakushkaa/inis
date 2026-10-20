import PropTypes from 'prop-types';
import cartIcon from '../../assets/icons/cart.svg';
import styles from './Button.module.css';

function Button({
  label,
  variant = 'addToCart',
  disabled = false,
  onClick,
  type = 'button',
}) {
  const className = [
    styles.button,
    variant === 'buyNow' ? styles.buyNow : styles.addToCart,
    disabled ? styles.disabled : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      type={type}
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {variant === 'addToCart' && (
        <img src={cartIcon} alt="" className={styles.icon} aria-hidden="true" />
      )}
      <span>{label}</span>
    </button>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['addToCart', 'buyNow']),
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
};

export default Button;
