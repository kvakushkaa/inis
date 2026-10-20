# DigiVault — Лабораторная работа №5

React-приложение DigiVault (вариант 3) с глобальным управлением состоянием через **Redux Toolkit**.  
Основано на компонентах ЛР №2: корзина вынесена из локального `useState` в централизованный store.

## Стек

- React + Vite
- Redux Toolkit (`createSlice`, `configureStore`)
- react-redux (`Provider`, `useSelector`, `useDispatch`)

## Архитектура store

```
src/store/
  index.js       # configureStore
  cartSlice.js   # срез корзины: items, lastMessage, actions
```

| Action | Назначение |
|--------|------------|
| `addToCart` | добавить товар / увеличить quantity |
| `removeFromCart` | удалить позицию |
| `clearCart` | очистить корзину |
| `setStatusMessage` | статусное сообщение |

## Синхронизация компонентов

- **ProductCard** — `useDispatch` → `addToCart`
- **CartIcon** — `useSelector(selectCartTotalQuantity)` → бейдж в шапке
- **CartPanel** — читает `items` / итог и диспатчит remove/clear
- **App** — показывает `lastMessage` из store

Компоненты не передают данные корзины друг другу через props — только через Redux.

## Запуск

```bash
npm install
npm run dev
```
