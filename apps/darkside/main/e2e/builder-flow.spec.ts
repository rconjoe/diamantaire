import { test, expect } from '@playwright/test';

test('Add a diamond first builder product tot he cart and get to checkout', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Start with a VRAI created diamond' }).click();
  await page.getByText('Pavé Cushion').first().click();
  await page.getByRole('button', { name: 'Select' }).click();
  await page.locator('div').filter({ hasText: /^Signature Prong Engagement Ring \| Yellow Gold \| \$1,000\+Select$/ }).getByRole('button').nth(3).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('button', { name: 'Add to bag' }).click();
  await page.getByRole('button', { name: 'Checkout | $14,784' }).click();
  await expect(page.locator('tfoot').getByText('$14,784.00')).toBeVisible();
});