<template>
  <div class="app">
    <header class="header">
      <div class="brand">
        <img :src="logo" alt="DigiVault" class="logo" />
        <div>
          <p class="brand-name">DigiVault</p>
          <p class="brand-tagline">Цифровые товары мгновенной доставки</p>
        </div>
      </div>

      <div class="header-actions">
        <button type="button" class="icon-button" aria-label="Поиск">
          <img :src="searchIcon" alt="" />
        </button>
        <button type="button" class="icon-button" aria-label="Профиль">
          <img :src="userIcon" alt="" />
        </button>
        <button
          type="button"
          class="icon-button cart-button"
          aria-label="Корзина"
          @click="showCart = !showCart"
        >
          <img :src="cartIcon" alt="" />
          <span v-if="cartCount > 0" class="cart-badge">{{ cartCount }}</span>
        </button>
      </div>
    </header>

    <main class="main">
      <section class="hero">
        <h1>Интернет-магазин цифровых товаров</h1>
        <p>
          UI-киты, иконки и аудиопресеты с мгновенной доставкой.
        </p>
        <label class="search">
          <span>Поиск</span>
          <input v-model="searchQuery" type="search" placeholder="Например, UI Kit" />
        </label>
        <p v-if="statusMessage" class="status">{{ statusMessage }}</p>
      </section>

      <section class="catalog-section">
        <h2 class="catalog-title">Каталог</h2>
        <div class="layout">
          <ProductList
            :products="filteredProducts"
            @add-to-cart="handleAddToCart"
            @buy-now="handleBuyNow"
          />

          <ShoppingCart
            v-if="showCart || cartItems.length > 0"
            :items="cartItems"
            @remove-from-cart="handleRemoveFromCart"
            @clear-cart="handleClearCart"
          />
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import ShoppingCart from './components/ShoppingCart.vue';
import { products } from './data/products';
import logo from './assets/icons/logo.svg';
import searchIcon from './assets/icons/search.svg';
import userIcon from './assets/icons/user.svg';
import cartIcon from './assets/icons/cart.svg';

export default {
  name: 'App',
  components: {
    ProductList,
    ShoppingCart,
  },
  data() {
    return {
      products,
      cartItems: [],
      showCart: true,
      searchQuery: '',
      statusMessage: '',
      logo,
      searchIcon,
      userIcon,
      cartIcon,
      nextCartId: 1,
    };
  },
  computed: {
    filteredProducts() {
      const query = this.searchQuery.trim().toLowerCase();
      if (!query) {
        return this.products;
      }
      return this.products.filter((product) => {
        const haystack = `${product.name} ${product.description} ${product.category}`.toLowerCase();
        return haystack.includes(query);
      });
    },
    cartCount() {
      return this.cartItems.reduce((sum, item) => sum + item.quantity, 0);
    },
  },
  methods: {
    handleAddToCart({ product, quantity }) {
      const existing = this.cartItems.find((item) => item.id === product.id);
      if (existing) {
        existing.quantity += quantity;
      } else {
        this.cartItems.push({
          ...product,
          cartId: this.nextCartId++,
          quantity,
        });
      }
      this.showCart = true;
      this.statusMessage = `В корзину добавлено: ${product.name} × ${quantity}`;
    },
    handleBuyNow({ product, quantity }) {
      const total = (product.price * quantity).toFixed(2);
      this.statusMessage = `Покупка: ${product.name} × ${quantity} на сумму ${total} Br`;
    },
    handleRemoveFromCart(cartId) {
      this.cartItems = this.cartItems.filter((item) => item.cartId !== cartId);
      this.statusMessage = 'Товар удалён из корзины';
    },
    handleClearCart() {
      this.cartItems = [];
      this.statusMessage = 'Корзина очищена';
    },
  },
};
</script>

<style scoped>
.app {
  min-height: 100vh;
  background:
    radial-gradient(circle at top left, rgba(15, 118, 110, 0.12), transparent 32%),
    radial-gradient(circle at top right, rgba(245, 158, 11, 0.12), transparent 28%),
    var(--color-canvas);
  color: var(--color-ink);
}

.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 28px;
  border-bottom: 1px solid #d7e3df;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(10px);
  position: sticky;
  top: 0;
  z-index: 10;
}

.brand {
  display: flex;
  align-items: center;
  gap: 12px;
}

.logo {
  width: 40px;
  height: 40px;
}

.brand-name {
  margin: 0;
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 700;
}

.brand-tagline {
  margin: 2px 0 0;
  color: var(--color-muted);
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;
}

.icon-button {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border: 1px solid #d7e3df;
  border-radius: 12px;
  background: #ffffff;
  cursor: pointer;
}

.icon-button img {
  width: 20px;
  height: 20px;
}

.cart-badge {
  position: absolute;
  top: -4px;
  right: -4px;
  min-width: 20px;
  height: 20px;
  padding: 0 5px;
  border-radius: 999px;
  background: var(--color-accent);
  color: var(--color-ink);
  font-family: 'Sora', sans-serif;
  font-size: 11px;
  font-weight: 700;
  line-height: 20px;
  text-align: center;
}

.main {
  max-width: 1120px;
  margin: 0 auto;
  padding: 28px 20px 48px;
}

.hero {
  margin-bottom: 28px;
}

.hero h1 {
  margin: 0 0 10px;
  font-family: 'Sora', sans-serif;
  font-size: clamp(28px, 4vw, 36px);
  font-weight: 700;
}

.hero p {
  margin: 0;
  max-width: 720px;
  color: var(--color-muted);
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  line-height: 1.5;
}

.search {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-width: 360px;
  margin-top: 16px;
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  color: var(--color-muted);
}

.search input {
  min-height: 44px;
  padding: 0 14px;
  border: 1px solid #d7e3df;
  border-radius: 12px;
  background: #ffffff;
  color: var(--color-ink);
}

.status {
  margin-top: 14px !important;
  padding: 12px 14px;
  border-radius: 12px;
  background: #ffffff;
  border: 1px solid #d7e3df;
  color: var(--color-brand-strong) !important;
  font-weight: 600;
}

.catalog-section {
  margin-top: 0;
}

.catalog-title {
  margin: 0 0 16px;
  font-family: 'Sora', sans-serif;
  font-size: 22px;
  color: var(--color-ink);
}

.layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 320px;
  gap: 20px;
  align-items: start;
}

@media (max-width: 900px) {
  .layout {
    grid-template-columns: 1fr;
  }

  .brand-tagline {
    display: none;
  }
}
</style>
