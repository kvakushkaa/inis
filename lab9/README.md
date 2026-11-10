# DigiVault — Лабораторная работа №9

Unit- и E2E-тесты для интернет-магазина цифровых товаров (вариант 3).

Клиент на React + Redux (Vite), каталог загружается из REST API ЛР8 (`/api/products`).

## Стек тестирования

| Уровень | Инструмент | Что покрыто |
|---------|------------|-------------|
| Unit | **Jest** + React Testing Library | редюсер `addToCart`, компонент `QuantitySelector` |
| E2E | **Playwright** | сценарий «Добавление в корзину» с `page.route()` (мок API ЛР8) |

## Установка

```bash
npm install
npx playwright install chromium
```

## Запуск приложения

```bash
# опционально: API из ЛР8 на :5008
# cd ../lab8 && npm run dev

npm run dev          # http://localhost:5179
```

Vite проксирует `/api` → `http://127.0.0.1:5008`. Если API недоступен, используется локальный fallback каталога.

## Unit-тесты (Jest)

```bash
npm run test:unit
```

Файлы:
- `src/store/__tests__/cartSlice.test.js` — добавление товара в корзину
- `src/components/QuantitySelector/__tests__/QuantitySelector.test.jsx` — счётчик не < 1

## E2E-тесты (Playwright)

```bash
npm run build
npm run test:e2e
# или с UI:
npm run test:e2e:ui
```

Сценарий (`e2e/add-to-cart.spec.js`):
1. Перехват `**/api/products**` через `page.route()`
2. Открытие каталога
3. Клик «Add to Cart» у UI Kit Pro
4. Проверка, что товар отображается в панели «Корзина»

## Структура

```
src/
  api/productsApi.js
  store/cartSlice.js
  components/QuantitySelector/
  store/__tests__/
  components/QuantitySelector/__tests__/
e2e/
  add-to-cart.spec.js
```
