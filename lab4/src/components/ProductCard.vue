<template>
  <article class="card">
    <div
      class="media"
      :style="{
        backgroundImage: `linear-gradient(160deg, ${product.accent} 0%, #0f172a 100%), url(${product.imageUrl})`,
      }"
    >
      <span class="category">{{ product.category }}</span>
      <div class="media-overlay">
        <h3 class="media-title">{{ product.name }}</h3>
        <p class="media-description">{{ product.description }}</p>
      </div>
    </div>

    <div class="body">
      <div class="header">
        <h3 class="title">{{ product.name }}</h3>
        <div class="rating">
          <img :src="starIcon" alt="" aria-hidden="true" />
          <span>{{ product.rating.toFixed(1) }}</span>
        </div>
      </div>

      <p class="price">{{ product.price.toFixed(2) }} Br</p>

      <div class="quantity" role="group" aria-label="Количество товара">
        <button
          type="button"
          class="qty-btn"
          :disabled="quantity <= 1"
          @click="decrement"
        >
          −
        </button>
        <span class="qty-value">{{ quantity }}</span>
        <button
          type="button"
          class="qty-btn"
          :disabled="quantity >= 99"
          @click="increment"
        >
          +
        </button>
      </div>

      <div class="actions">
        <button type="button" class="btn btn-cart" @click="addToCart">
          <img :src="cartIcon" alt="" aria-hidden="true" />
          Add to Cart
        </button>
        <button type="button" class="btn btn-buy" @click="buyNow">Buy Now</button>
      </div>
    </div>
  </article>
</template>

<script>
import cartIcon from '../assets/icons/cart.svg';
import starIcon from '../assets/icons/star.svg';

export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      quantity: 1,
      cartIcon,
      starIcon,
    };
  },
  methods: {
    decrement() {
      if (this.quantity > 1) {
        this.quantity -= 1;
      }
    },
    increment() {
      if (this.quantity < 99) {
        this.quantity += 1;
      }
    },
    addToCart() {
      this.$emit('add-to-cart', {
        product: this.product,
        quantity: this.quantity,
      });
    },
    buyNow() {
      this.$emit('buy-now', {
        product: this.product,
        quantity: this.quantity,
      });
    },
  },
};
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #dce8e4;
  border-radius: 16px;
  box-shadow: 0 12px 28px rgba(15, 23, 42, 0.08);
}

.media {
  position: relative;
  min-height: 180px;
  background-size: cover;
  background-position: center;
}

.category {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(15, 23, 42, 0.55);
  color: #ffffff;
  font-family: 'Sora', sans-serif;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}

.media-overlay {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  padding: 16px;
  background: linear-gradient(180deg, transparent 0%, rgba(15, 23, 42, 0.78) 100%);
  color: #ffffff;
}

.media-title {
  margin: 0 0 4px;
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 600;
}

.media-description {
  margin: 0;
  font-family: 'Manrope', sans-serif;
  font-size: 13px;
  opacity: 0.9;
}

.body {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
}

.header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
}

.title {
  margin: 0;
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 600;
  color: var(--color-ink);
}

.rating {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--color-muted);
  font-family: 'Manrope', sans-serif;
  font-size: 14px;
  font-weight: 600;
}

.rating img {
  width: 16px;
  height: 16px;
}

.price {
  margin: 0;
  font-family: 'Sora', sans-serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--color-brand-strong);
}

.quantity {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border: 1px solid #d7e3df;
  border-radius: 12px;
  background: #ffffff;
  width: fit-content;
}

.qty-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 10px;
  background: #f3f7f6;
  color: var(--color-ink);
  font-family: 'Sora', sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 1;
  cursor: pointer;
}

.qty-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.qty-value {
  min-width: 28px;
  text-align: center;
  font-family: 'Manrope', sans-serif;
  font-size: 15px;
  font-weight: 700;
}

.actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 44px;
  padding: 0 8px;
  border: none;
  border-radius: 12px;
  font-family: 'Sora', sans-serif;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  white-space: nowrap;
}

.btn img {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
}

.btn-cart {
  background: var(--color-brand);
  color: #ffffff;
  box-shadow: 0 8px 18px rgba(15, 118, 110, 0.22);
}

.btn-buy {
  background: var(--color-accent);
  color: var(--color-ink);
  box-shadow: 0 8px 18px rgba(245, 158, 11, 0.28);
}
</style>
