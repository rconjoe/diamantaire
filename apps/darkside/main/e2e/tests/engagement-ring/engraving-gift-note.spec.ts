import { test, expect } from '@playwright/test';

/**
 * Test verify engraving and Gift note are showing at checkout
 */
test('Setting first with engraving and gift note flow', async ({ page })=> {
    await page.goto('/');
    await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();
    await page.getByRole('link', { name: 'Create your engagement ring' }).click();
    await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
    await page.getByRole('button', { name: 'Signature Halo' }).click();
    await page.getByRole('button', { name: 'Radiant' }).click()
    await page.getByRole('button', { name: 'Select your VRAI created diamond' }).click();
    await page.click("[data-id='2']");
    await page.getByRole('button', { name: 'Select' }).click();
    await page.getByRole('button', { name: 'Add engraving' }).click();
    await page.locator('input[type="text"]').click();
    await page.locator('input[type="text"]').fill('Test Engraving');
    await page.locator('div').filter({ hasText: /^Character limit \(14\/16\)Add engraving$/ }).getByRole('button').click();
    await page.getByRole('button', { name: 'Add to bag' }).click();
    await page.getByRole('button', { name: 'Add gift note' }).click();
    await page.locator('textarea').fill("Test Gift Note");
    await page.getByRole('button', { name: 'Checkout | $' }).click();

});
