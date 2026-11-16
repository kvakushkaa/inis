# DigiVault — Лабораторная работа №11

Базовая безопасность full-stack приложения (вариант 3): защита от XSS в поле «Отзыв о товаре», Helmet.js и CSP.

## Что реализовано

| Мера | Где |
|------|-----|
| Sanitization текста отзыва | `server/src/utils/sanitize.js` (`sanitize-html`) |
| Helmet.js + CSP `script-src 'self'` | `server/src/server.js` |
| Демо XSS до/после | `/demos/xss-before.html`, `/demos/xss-after.html` |
| React-клиент отзывов | `client/` (безопасный рендер текста) |

## Запуск

```bash
# зависимости
npm run install:all
# или:
npm install --prefix server && npm install --prefix client

# API (порт 5011)
npm run dev:server

# клиент (порт 51711, proxy /api → 5011)
npm run dev:client
```

### Демо XSS

1. **До защиты:** http://localhost:5011/demos/xss-before.html  
   Отправка отзыва с `<img src=x onerror=alert('XSS PoC')>` → срабатывает `alert`.
2. **После защиты:** http://localhost:5011/demos/xss-after.html  
   Та же нагрузка → sanitization + `textContent`, alert не выполняется.
3. Заголовки: DevTools → Network → любой `/api/*` → Response Headers (`Content-Security-Policy`, `X-Frame-Options`, …).

### Скриншоты для отчёта

```bash
# сервер должен быть запущен
npm install   # корневой @playwright/test
npx playwright install chromium
npm run demo:screenshots
```

## API отзывов

| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/api/reviews` | список отзывов |
| POST | `/api/reviews` | создать отзыв (**с sanitization**) |
| POST | `/api/reviews/vulnerable` | демо без очистки (только для PoC) |

## Структура

```
server/   Express + MongoDB + Helmet + sanitize-html
client/   React форма отзывов
demos/    XSS до/после
scripts/  capture-security-demos.mjs
```
