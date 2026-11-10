import cartReducer, { addToCart, removeFromCart, clearCart } from '../cartSlice';

describe('cartReducer — добавление товара в корзину', () => {
  const initialState = {
    items: [],
    lastMessage: 'Выберите товар и добавьте его в корзину.',
  };

  it('добавляет новый товар в пустую корзину', () => {
    const nextState = cartReducer(
      initialState,
      addToCart({
        id: 'ui-kit-pro',
        title: 'UI Kit Pro',
        price: 89,
        quantity: 1,
      }),
    );

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0]).toEqual({
      id: 'ui-kit-pro',
      title: 'UI Kit Pro',
      price: 89,
      quantity: 1,
    });
    expect(nextState.lastMessage).toBe('В корзину добавлено: UI Kit Pro × 1');
  });

  it('увеличивает quantity, если товар уже есть в корзине', () => {
    const stateWithItem = cartReducer(
      initialState,
      addToCart({
        id: 'ui-kit-pro',
        title: 'UI Kit Pro',
        price: 89,
        quantity: 1,
      }),
    );

    const nextState = cartReducer(
      stateWithItem,
      addToCart({
        id: 'ui-kit-pro',
        title: 'UI Kit Pro',
        price: 89,
        quantity: 2,
      }),
    );

    expect(nextState.items).toHaveLength(1);
    expect(nextState.items[0].quantity).toBe(3);
  });

  it('удаляет товар и очищает корзину', () => {
    let state = cartReducer(
      initialState,
      addToCart({ id: 'a', title: 'A', price: 10, quantity: 1 }),
    );
    state = cartReducer(state, removeFromCart('a'));
    expect(state.items).toHaveLength(0);

    state = cartReducer(
      initialState,
      addToCart({ id: 'b', title: 'B', price: 20, quantity: 1 }),
    );
    state = cartReducer(state, clearCart());
    expect(state.items).toHaveLength(0);
    expect(state.lastMessage).toBe('Корзина очищена');
  });
});
