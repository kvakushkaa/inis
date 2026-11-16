# DigiVault — Лабораторная работа №12

Интеграция визуализации данных (вариант 3): **линейный график средней цены товаров по категориям**.

## Что сделано

| Часть | Реализация |
|-------|------------|
| API | `GET /api/analytics/summary` — MongoDB `aggregate` (`$group` + `$avg`) |
| UI | страница `/analytics` (React Router) |
| График | **Plotly.js** (`react-plotly.js`) — Line Chart + tooltips |

## Почему Line Chart

Категории упорядочены по оси X, средняя цена — по оси Y. Линия с маркерами удобно показывает «динамику» средней цены между категориями каталога DigiVault и поддерживает интерактивные подсказки Plotly.

## Пример ответа API

```json
{
  "title": "Средняя цена товаров DigiVault по категориям",
  "chartType": "line",
  "categories": ["AUDIO", "ICONS", "MOCKUPS", "MOTION", "UI KIT"],
  "avgPrices": [56.67, 45, 95, 82, 86],
  "series": [
    { "category": "AUDIO", "avgPrice": 56.67, "productCount": 3, "minPrice": 40, "maxPrice": 75 }
  ]
}
```

## Запуск

```bash
npm run install:all

# терминал 1 — API :5012
npm run dev:server

# терминал 2 — клиент :51712
npm run dev:client
```

Откройте http://127.0.0.1:51712/analytics

### Скриншот для отчёта

```bash
npm install
npx playwright install chromium
# сервер и клиент должны быть запущены
npm run demo:screenshot
```

## Структура

```
server/src/controllers/analyticsController.js
server/src/routes/analyticsRoutes.js
client/src/pages/AnalyticsPage.jsx
```
