import Link from 'next/link';
import styles from './Button.module.css';

export default function Button({
  label,
  variant = 'addToCart',
  onClick,
  type = 'button',
  href,
}) {
  const className = [
    styles.button,
    variant === 'buyNow' ? styles.buyNow : styles.addToCart,
  ].join(' ');

  const content = (
    <>
      {variant === 'addToCart' && (
        <img src="/icons/cart.svg" alt="" className={styles.icon} aria-hidden="true" />
      )}
      <span>{label}</span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={className}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={className} onClick={onClick}>
      {content}
    </button>
  );
}
