import { test, expect } from '@playwright/test';
import exp from 'constants';

//Need to create a class to hold information
//verify the item price vs checkout price = same
//Need to work on slider 
//Add more assertion
//

/**
 * Test not ready to commit
 */
test('Toi et Moi flow', async ({ page })=> {
    await page.goto('/');
    await page.getByRole('link', { name: 'ENGAGEMENT' }).first().click();
    await page.getByRole('button', { name: 'Select a ring setting' }).click();
    await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
    await page.getByRole('link', { name: 'The Toi et Moi' }).first().click();
    await page.locator('xpath=//div[@type=\'diamond-type-round-brilliant+pear\']').click()
    await page.getByRole('button', { name: 'Select your diamonds' }).click();
    await page.getByRole('link', { name: 'Check availability' }).click();
    // await expect(page.getByRole('heading', { name: 'We’re ready to Cut for You™' }));
    await page.click("[id='diamond-table-row-button-2']");

    await page.getByRole('link', { name: 'Complete & review your ring' }).click()
    await page.getByRole('button', { name: 'Add to bag' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();

});
