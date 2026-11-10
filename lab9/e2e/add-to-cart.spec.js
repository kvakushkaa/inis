import { test, expect } from '@playwright/test';

const mockedProducts = [
  {
    _id: 'ui-kit-pro',
    name: 'UI Kit Pro',
    price: 89,
    imageUrl: '/products/ui-kit-pro.png',
    description: 'Design system pack',
    category: 'UI KIT',
  },
  {
    _id: 'icon-bundle',
    name: 'Icon Bundle 240',
    price: 35,
    imageUrl: '/products/icon-bundle.png',
    description: 'Vector icon set',
    category: 'ICONS',
  },
];

test.describe('Сценарий «Добавление в корзину»', () => {
  test('каталог → Add to cart → товар виден в корзине (API замокан)', async ({ page }) => {
    // Перехват запросов к API ЛР8 — стабильный и предсказуемый E2E
    await page.route('**/api/products**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedProducts),
      });
    });

    await page.goto('/');

    await expect(page.getByTestId('catalog')).toBeVisible();
    await expect(page.getByTestId('product-card-ui-kit-pro')).toBeVisible();
    await expect(page.getByTestId('cart-empty')).toBeVisible();

    await page.getByTestId('add-to-cart-ui-kit-pro').click();

    await expect(page.getByTestId('cart-items')).toBeVisible();
    await expect(page.getByTestId('cart-item-ui-kit-pro')).toBeVisible();
    await expect(page.getByTestId('cart-item-ui-kit-pro')).toContainText('UI Kit Pro');
    await expect(page.getByTestId('cart-badge')).toHaveText('1');
    await expect(page.getByTestId('status-message')).toContainText('UI Kit Pro');
  });
});
