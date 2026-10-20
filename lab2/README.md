# DigiVault — Лабораторная работа №2

React-приложение интернет-магазина цифровых товаров **DigiVault** (вариант 3).  
Реализованы UI-компоненты из дизайн-системы ЛР №1: `Button`, `QuantitySelector`, `ProductCard`, а также `CartIcon` для демонстрации интерактивности.

## Стек

- React (функциональные компоненты, JSX)
- Vite
- CSS Modules
- PropTypes
- Локальное состояние через `useState` (без Redux/Zustand)

## Структура

```
src/
  components/
    Button/
    QuantitySelector/
    ProductCard/
    CartIcon/
  assets/
    icons/
    products/
  data/products.js
  App.jsx
```

## Запуск

```bash
npm install
npm run dev
```

Сборка:

```bash
npm run build
npm run preview
```

## Реализованные компоненты

| Компонент | Props | Локальное состояние |
|-----------|-------|---------------------|
| `Button` | `label`, `variant` (`addToCart` / `buyNow`), `disabled`, `onClick` | — |
| `QuantitySelector` | `initialValue`, `min`, `max`, `onChange` | `quantity` (`useState`) |
| `ProductCard` | `title`, `description`, `category`, `price`, `rating`, `image`, `accent`, `onAddToCart`, `onBuyNow` | `quantity` (через `QuantitySelector`) |
| `CartIcon` | `count`, `onClick` | — (счётчик хранится в `App`) |

## Интерактивность

- `QuantitySelector` изменяет количество кнопками «+» / «−»
- `ProductCard` передаёт данные товара через props и сообщает о добавлении/покупке наружу
- В `App` счётчик корзины обновляется через `useState` при нажатии **Add to Cart**
