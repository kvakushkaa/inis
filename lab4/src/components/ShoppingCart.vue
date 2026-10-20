<template>
  <aside class="cart">
    <div class="cart-header">
      <h2>Корзина</h2>
      <span v-if="totalQuantity > 0" class="badge">{{ totalQuantity }}</span>
    </div>

    <p v-if="items.length === 0" class="empty">
      Корзина пуста. Добавьте товар из каталога.
    </p>

    <ul v-else class="list">
      <li v-for="item in items" :key="item.cartId" class="item">
        <div>
          <p class="name">{{ item.name }}</p>
          <p class="meta">
            {{ item.quantity }} × {{ item.price.toFixed(2) }} Br =
            {{ (item.price * item.quantity).toFixed(2) }} Br
          </p>
        </div>
        <button
          type="button"
          class="remove"
          @click="$emit('remove-from-cart', item.cartId)"
        >
          Удалить
        </button>
      </li>
    </ul>

    <div v-if="items.length > 0" class="footer">
      <p class="total">Итого: {{ total.toFixed(2) }} Br</p>
      <button type="button" class="clear" @click="$emit('clear-cart')">
        Очистить
      </button>
    </div>
  </aside>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalQuantity() {
      return this.items.reduce((sum, item) => sum + item.quantity, 0);
    },
    total() {
      return this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },
  },
};
</script>

<style scoped>
.cart {
  padding: 16px;
  border: 1px solid #d7e3df;
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.06);
}

.cart-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.cart-header h2 {
  margin: 0;
  font-family: 'Sora', sans-serif;
  font-size: 20px;
}

.badge {
  min-width: 24px;
  height: 24px;
  padding: 0 7px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-ink);
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  font-weight: 700;
  line-height: 24px;
  text-align: center;
}

.empty {
  margin: 0;
  color: var(--color-muted);
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
}

.list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 10px 12px;
  border-radius: 12px;
  background: #f3f7f6;
}

.name {
  margin: 0 0 2px;
  font-family: 'Sora', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.meta {
  margin: 0;
  color: var(--color-muted);
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
}

.remove,
.clear {
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  font-weight: 600;
}

.remove {
  padding: 8px 10px;
  background: #ffffff;
  color: #b91c1c;
  border: 1px solid #fecaca;
}

.clear {
  padding: 10px 14px;
  background: var(--color-brand);
  color: #ffffff;
}

.footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-top: 14px;
}

.total {
  margin: 0;
  font-family: 'Sora', sans-serif;
  font-size: 16px;
  font-weight: 700;
  color: var(--color-brand-strong);
}
</style>
