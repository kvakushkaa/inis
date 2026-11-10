# DigiVault — Лабораторная работа №8

REST API интернет-магазина цифровых товаров (вариант 3) на **Node.js + Express + MongoDB (Mongoose)**.

## Стек

- Express
- Mongoose
- dotenv
- nodemon (dev)
- mongodb-memory-server (опционально, если нет локального MongoDB / Atlas)

## Mongoose-схема Product

| Поле | Тип | Ограничения |
|------|-----|-------------|
| `name` | String | required |
| `price` | Number | required, ≥ 0 |
| `imageUrl` | String | optional |
| `description` | String | optional (DigiVault) |
| `category` | String | optional (DigiVault) |

## API

| Метод | URL | Назначение |
|-------|-----|------------|
| GET | `/api/products` | список товаров |
| GET | `/api/products/:id` | товар по ID |
| POST | `/api/products` | создать товар |
| PUT | `/api/products/:id` | обновить товар |
| DELETE | `/api/products/:id` | удалить товар |

## Установка и запуск

```bash
npm install
cp .env.example .env   # при необходимости отредактируйте
npm run dev
```

Сервер: http://localhost:5008

### MongoDB

**Вариант A — без установленного MongoDB (для демо/отчёта):**

```env
USE_MEMORY_DB=true
```

**Вариант B — локальный MongoDB / Atlas:**

```env
USE_MEMORY_DB=false
MONGODB_URI=mongodb://127.0.0.1:27017/digivault
# или mongodb+srv://...
```

### Seed (начальные товары DigiVault)

```bash
npm run seed
```

> При `USE_MEMORY_DB=true` seed и сервер используют разные процессы памяти — для демо удобнее создавать товары через POST в Postman.

## Примеры запросов (curl / Postman)

```bash
# CREATE
curl -X POST http://localhost:5008/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"UI Kit Pro","price":89,"imageUrl":"/products/ui-kit-pro.png"}'

# READ ALL
curl http://localhost:5008/api/products

# READ ONE
curl http://localhost:5008/api/products/<ID>

# UPDATE
curl -X PUT http://localhost:5008/api/products/<ID> \
  -H "Content-Type: application/json" \
  -d '{"price":99}'

# DELETE
curl -X DELETE http://localhost:5008/api/products/<ID>
```

## Структура

```
src/
  server.js
  config/db.js
  models/Product.js
  controllers/productController.js
  routes/productRoutes.js
  seed.js
```
