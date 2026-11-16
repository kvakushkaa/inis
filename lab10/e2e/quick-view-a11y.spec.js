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
];

test.describe('Quick View a11y', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/products**', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockedProducts),
      });
    });
    await page.goto('/');
    await expect(page.getByTestId('catalog')).toBeVisible();
  });

  test('модалка: role=dialog, Esc закрывает, focus trap', async ({ page }) => {
    await page.getByTestId('quick-view-ui-kit-pro').click();

    const dialog = page.getByTestId('quick-view-dialog');
    await expect(dialog).toBeVisible();
    await expect(dialog).toHaveAttribute('role', 'dialog');
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    await expect(page.getByTestId('quick-view-close')).toBeFocused();

    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await expect(page.getByTestId('quick-view-close')).toBeFocused();

    await page.keyboard.press('Escape');
    await expect(dialog).toHaveCount(0);
  });
});
