import { useDispatch, useSelector } from 'react-redux';
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
    <aside className={styles.panel}>
      <div className={styles.header}>
        <h2>Корзина</h2>
        {totalQuantity > 0 && <span className={styles.badge}>{totalQuantity}</span>}
      </div>

      {items.length === 0 ? (
        <p className={styles.empty}>Корзина пуста. Добавьте товар из каталога.</p>
      ) : (
        <>
          <ul className={styles.list}>
            {items.map((item) => (
              <li key={item.id} className={styles.item}>
                <div>
                  <p className={styles.name}>{item.title}</p>
                  <p className={styles.meta}>
                    {item.quantity} × {item.price.toFixed(2)} Br ={' '}
                    {(item.price * item.quantity).toFixed(2)} Br
                  </p>
                </div>
                <button
                  type="button"
                  className={styles.remove}
                  onClick={() => dispatch(removeFromCart(item.id))}
                >
                  Удалить
                </button>
              </li>
            ))}
          </ul>

          <div className={styles.footer}>
            <p className={styles.total}>Итого: {totalPrice.toFixed(2)} Br</p>
            <button
              type="button"
              className={styles.clear}
              onClick={() => dispatch(clearCart())}
            >
              Очистить
            </button>
          </div>
        </>
      )}
    </aside>
  );
}

export default CartPanel;
