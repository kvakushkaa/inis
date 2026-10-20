# DigiVault — Лабораторная работа №3

Angular-приложение интернет-магазина цифровых товаров **DigiVault** (вариант 3).  
Реализованы `ProductCardComponent`, `ProductListComponent` и `ProductsService` с mock-данными.

## Стек

- Angular 19 (NgModule-архитектура)
- Dependency Injection (`@Injectable`, `providedIn: 'root'`)
- `@Input()` для передачи товара в карточку
- `*ngFor` для списка товаров
- инкапсулированные `*.component.css`

## Структура

```
src/app/
  app.module.ts
  models/product.model.ts
  services/products.service.ts
  components/
    product-card/
    product-list/
src/assets/          # ассеты из ЛР №1
public/assets/       # копия для раздачи Vite/Angular
```

## Запуск

```bash
npm install
npm start
# или: ng serve
```

Приложение: http://localhost:4200/

Сборка:

```bash
npm run build
```

## Архитектура

| Сущность | Назначение |
|----------|------------|
| `AppModule` | корневой модуль, declarations компонентов |
| `ProductsService` | синглтон, метод `getData()` возвращает 4 товара |
| `ProductListComponent` | inject сервиса в конструктор, загрузка в `ngOnInit`, `*ngFor` |
| `ProductCardComponent` | отображение одного товара через `@Input() product` |
