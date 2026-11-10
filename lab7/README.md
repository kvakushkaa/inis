# DigiVault — Лабораторная работа №7

Перенос интернет-магазина цифровых товаров (вариант 3) на **Next.js** с гибридным рендерингом:

| Маршрут | Стратегия | API Next.js |
|---------|-----------|-------------|
| `/products` | **SSR** | `getServerSideProps` |
| `/products/[id]` | **SSG** | `getStaticProps` + `getStaticPaths` |

`/` перенаправляет на `/products`.

## Стек

- Next.js 14 (Pages Router)
- React 18
- CSS Modules + дизайн-система DigiVault из предыдущих ЛР

## Почему Pages Router

В задании требуются `getServerSideProps`, `getStaticProps` и `getStaticPaths` — это API каталога `pages/`.

## Структура

```
pages/
  index.js                 # redirect → /products
  products/
    index.js               # SSR-каталог
    [id].js                # SSG-карточка товара
components/
  Layout/, ProductCard/, Button/
data/
  products.js              # mock-данные
public/
  icons/, products/        # ассеты
```

## Запуск

```bash
npm install
npm run dev
```

Откройте http://localhost:3000/products

## Production

```bash
npm run build
npm run start
```

При `build` Next.js статически сгенерирует `/products/ui-kit-pro`, `/products/icon-bundle`, `/products/synthwave`.  
Страница `/products` останется серверной и будет собираться при каждом запросе.

## Проверка SSR / SSG

1. Откройте `/products` → View Page Source — в HTML должны быть товары и метка времени сервера.
2. Откройте `/products/ui-kit-pro` → View Page Source — контент товара и время сборки в HTML.
3. Обновите `/products` несколько раз — время SSR меняется; у SSG-страницы время сборки фиксировано до следующего `build`.
