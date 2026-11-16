import { useDispatch, useSelector } from 'react-redux';
import { Badge, Button as BsButton, Card, ListGroup } from 'react-bootstrap';
import {
  clearCart,
  removeFromCart,
  selectCartItems,
  selectCartTotalPrice,
  selectCartTotalQuantity,
} from '../../store/cartSlice';
import styles from './CartPanel.module.css';

function CartPanel() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalPrice = useSelector(selectCartTotalPrice);

  return (
    <Card className={`${styles.panel} h-100 w-100`} data-testid="cart-panel">
      <Card.Body className="p-3">
        <div className="d-flex align-items-center gap-2 mb-3">
          <h2 className={`${styles.heading} mb-0`}>Корзина</h2>
          {totalQuantity > 0 && (
            <Badge bg="warning" text="dark" className={styles.badge} data-testid="cart-badge">
              {totalQuantity}
            </Badge>
          )}
        </div>

        {items.length === 0 ? (
          <p className={`${styles.empty} mb-0`} data-testid="cart-empty">
            Корзина пуста. Добавьте товар из каталога.
          </p>
        ) : (
          <>
            <ListGroup variant="flush" className="d-flex flex-column gap-2" data-testid="cart-items">
              {items.map((item) => (
                <ListGroup.Item
                  key={item.id}
                  className={`${styles.item} d-flex align-items-center justify-content-between gap-3 border-0`}
                  data-testid={`cart-item-${item.id}`}
                >
                  <div>
                    <p className={`${styles.name} mb-1`}>{item.title}</p>
                    <p className={`${styles.meta} mb-0`}>
                      {item.quantity} × {item.price.toFixed(2)} Br ={' '}
                      {(item.price * item.quantity).toFixed(2)} Br
                    </p>
                  </div>
                  <BsButton
                    type="button"
                    variant="outline-danger"
                    size="sm"
                    className={styles.remove}
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    Удалить
                  </BsButton>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <div className="d-flex align-items-center justify-content-between gap-3 mt-3">
              <p className={`${styles.total} mb-0`}>Итого: {totalPrice.toFixed(2)} Br</p>
              <BsButton
                type="button"
                variant="primary"
                className={styles.clear}
                onClick={() => dispatch(clearCart())}
              >
                Очистить
              </BsButton>
            </div>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default CartPanel;
