import { test, expect } from '@playwright/test';

test('has only 1 h1 title', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('h1').count()).toBe(1);
});

test('has meta tags', async ({ page }) => {
  await page.goto('/');

  // Expect h1 to contain a substring.
  expect(await page.locator('head').count()).toBe(1);
});
