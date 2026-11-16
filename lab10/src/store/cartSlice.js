import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  lastMessage: 'Выберите товар и добавьте его в корзину.',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const { id, title, price, quantity } = action.payload;
      const existing = state.items.find((item) => item.id === id);

      if (existing) {
        existing.quantity += quantity;
      } else {
        state.items.push({ id, title, price, quantity });
      }

      state.lastMessage = `В корзину добавлено: ${title} × ${quantity}`;
    },
    removeFromCart(state, action) {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      state.lastMessage = 'Товар удалён из корзины';
    },
    clearCart(state) {
      state.items = [];
      state.lastMessage = 'Корзина очищена';
    },
    setStatusMessage(state, action) {
      state.lastMessage = action.payload;
    },
  },
});

export const { addToCart, removeFromCart, clearCart, setStatusMessage } =
  cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartMessage = (state) => state.cart.lastMessage;
export const selectCartTotalQuantity = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartTotalPrice = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
