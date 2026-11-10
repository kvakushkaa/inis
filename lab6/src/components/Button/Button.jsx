import PropTypes from 'prop-types';
import { Button as BsButton } from 'react-bootstrap';
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
    'w-100 d-inline-flex align-items-center justify-content-center gap-2',
  ].join(' ');

  return (
    <BsButton
      type={type}
      variant={variant === 'buyNow' ? 'warning' : 'primary'}
      className={className}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
    >
      {variant === 'addToCart' && (
        <img src={cartIcon} alt="" className={styles.icon} aria-hidden="true" />
      )}
      <span>{label}</span>
    </BsButton>
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
