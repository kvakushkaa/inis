import { useEffect, useId, useRef } from 'react';
import PropTypes from 'prop-types';
import { Badge, Button as BsButton } from 'react-bootstrap';
import styles from './QuickViewModal.module.css';

const FOCUSABLE_SELECTOR =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Модальное окно быстрого просмотра товара (a11y ЛР10):
 * - role="dialog" + aria-modal
 * - закрытие по Esc
 * - focus trap (Tab / Shift+Tab)
 * - возврат фокуса на триггер
 */
function QuickViewModal({ product, onClose, onAddToCart }) {
  const titleId = useId();
  const descId = useId();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);

  useEffect(() => {
    if (!product) return undefined;

    const previouslyFocused = document.activeElement;
    const dialog = dialogRef.current;
    closeButtonRef.current?.focus();

    const getFocusable = () =>
      Array.from(dialog.querySelectorAll(FOCUSABLE_SELECTOR)).filter(
        (el) => !el.hasAttribute('disabled') && el.getAttribute('aria-hidden') !== 'true',
      );

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== 'Tab') return;

      const focusable = getFocusable();
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      if (previouslyFocused && typeof previouslyFocused.focus === 'function') {
        previouslyFocused.focus();
      }
    };
  }, [product, onClose]);

  if (!product) return null;

  return (
    <div
      className={styles.backdrop}
      data-testid="quick-view-backdrop"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descId}
        data-testid="quick-view-dialog"
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.header}>
          <div>
            <Badge bg="dark" className={styles.category}>
              {product.category}
            </Badge>
            <h2 id={titleId} className={styles.title}>
              {product.title}
            </h2>
          </div>
          <BsButton
            ref={closeButtonRef}
            type="button"
            variant="light"
            className={styles.close}
            onClick={onClose}
            aria-label="Закрыть быстрый просмотр"
            data-testid="quick-view-close"
          >
            ×
          </BsButton>
        </header>

        <div
          className={styles.media}
          style={{
            backgroundImage: `linear-gradient(160deg, ${product.accent || '#0F766E'} 0%, #0f172a 100%), url(${product.image})`,
          }}
          role="img"
          aria-label={`Превью товара ${product.title}`}
        />

        <p id={descId} className={styles.description}>
          {product.description}
        </p>
        <p className={styles.price} data-testid="quick-view-price">
          {product.price.toFixed(2)} Br
        </p>

        <div className={styles.actions}>
          <BsButton
            type="button"
            variant="primary"
            className={styles.primary}
            onClick={() => onAddToCart(product)}
            data-testid="quick-view-add"
          >
            Добавить в корзину
          </BsButton>
          <BsButton
            type="button"
            variant="outline-secondary"
            className={styles.secondary}
            onClick={onClose}
          >
            Закрыть
          </BsButton>
        </div>
      </div>
    </div>
  );
}

QuickViewModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string,
    accent: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
  onAddToCart: PropTypes.func.isRequired,
};

export default QuickViewModal;
