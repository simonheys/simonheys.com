import { expect, test } from '@playwright/test';

test('should navigate to the about page', async ({ page }) => {
  await page.goto('/');
  await page.locator('[data-tid="navigation"] a[href="/about"]').click();
  await page.waitForURL('/about');
  await expect(page.locator('p')).toContainText([/designer/i]);
});
