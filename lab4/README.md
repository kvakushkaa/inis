# DigiVault — Лабораторная работа №4

Vue.js-приложение интернет-магазина цифровых товаров **DigiVault** (вариант 3).

## Стек

- Vue 3 (Options API: `data()`, `methods`, `computed`)
- Vite
- директивы `v-for`, `v-if`, `v-model` (при необходимости), `@event`, `:attr`
- `props` и `$emit`
- scoped CSS
- без Pinia / Vuex

## Компоненты

| Компонент | Назначение |
|-----------|------------|
| `ProductCard.vue` | Карточка товара, кнопка «Добавить в корзину» → `$emit('add-to-cart')` |
| `ProductList.vue` | Список через `v-for`, проброс событий родителю |
| `ShoppingCart.vue` | Содержимое корзины, `v-if` / `v-else`, итог через `computed` |
| `App.vue` | Родитель: `cartItems` в `data()`, обработка событий |

## Запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
```
