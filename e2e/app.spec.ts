import { expect, test } from "@playwright/test";

test("should include title", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator('[data-tid="title"]')).toContainText("Simon Heys");
});

test("should navigate to the about page", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-tid="navigation"] a[href="/about"]').click();
  await page.waitForURL("/about");
  await expect(page.locator("p")).toContainText([/designer/i]);
});
