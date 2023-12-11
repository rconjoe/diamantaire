import { test, expect } from '@playwright/test';

//
/**
 * Fine - Jewerly - earrings setting first flow
 * 
 */

test('Earrings Setting First flow with filter', async ({ page })=> {
    await page.goto('/');

    await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
    await page.getByRole('link', { name: 'Earrings' }).click();

    await page.getByRole('button', { name: 'Metal' }).click();
    await page.getByRole('button', { name: 'White Gold'}).first().click();

    // Multiple Filters is broken
    // await page.getByRole('button', { name: 'Shape' }).click();
    // await page.locator('li > .flex').first().click()

    // await page.getByRole('button', { name: 'Styles' }).click();
    // await page.locator('li').filter({ hasText: 'Statement' }).getByRole('button').click()
    
    await page.getByRole('link', { name: 'White Gold Solitaire Diamond Studs Emerald' }).click();
    await page.getByRole('button', { name: 'Add to bag' }).click();
    await page.waitForLoadState();
    await expect(page.getByRole('button', { name: 'Checkout' })).toContainText('$750');
    await page.getByRole('button', { name: 'Checkout' }).click();

});
