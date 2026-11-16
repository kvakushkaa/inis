# DigiVault — Лабораторная работа №10

Веб-доступность (a11y / WCAG) для интернет-магазина цифровых товаров (вариант 3).

## Задачи варианта

1. **Focus trap** в модальном окне быстрого просмотра  
2. Управление с клавиатуры: закрытие по **Esc**, Tab / Shift+Tab  
3. ARIA: `role="dialog"`, `aria-modal`, `aria-labelledby`  
4. Контрастность цен на карточках (≥ WCAG AA 4.5:1)

## Что сделано

- Компонент `QuickViewModal` с ловушкой фокуса и Esc  
- Семантика: `<header>`, `<nav>`, `<main>`, skip-link, видимый `:focus-visible`  
- Цена: цвет `#0f3f3c` на белом (~10:1) вместо низкоконтрастного teal  
- Аудит axe-core: `a11y/before.html` (до) и живое приложение (после)

## Запуск

```bash
npm install
npx playwright install chromium
npm run dev          # http://localhost:5180
```

## Тесты

```bash
npm run test:unit    # Jest (редюсер, QuantitySelector, QuickViewModal a11y)
npm run build && npm run test:e2e
```

## Аудит доступности

```bash
npm run build
npm run preview &    # :5180
npm run a11y:audit   # screenshots/01-axe-before.* и 02-axe-after.*
```

## Структура

```
src/components/QuickViewModal/   # dialog + focus trap + Esc
a11y/before.html                 # фикстура «до исправлений»
scripts/a11y-audit.mjs           # axe-core before/after
e2e/quick-view-a11y.spec.js
```
