import { test, expect } from '@playwright/test';

//Need to create a class to hold information
//verify the item price vs checkout price = same
//Need to work on slider 
//Add more assertion
//

//Not ready.
test('Cut for you flow', async ({ page })=> {
    await page.goto('http://localhost:4200/');
    
    await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();
    await page.locator('#primary-navigation').getByRole('link', { name: 'Start with a setting' }).click()

    //await page.getByRole('link', { name: 'ENGAGEMENT' }).first().click();
    //await page.getByRole('button', { name: 'Select a ring setting' }).click();
    //await page.getByRole('button', { name: 'Select your diamond' }).click();

    await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
    await page.getByRole('link', { name: 'The Classic' }).first().click();
    await page.getByRole('button', { name: 'Oval' }).click()
    await page.getByRole('button', { name: 'Select your VRAI created' }).click();
    await expect(page.getByText('We\’ll cut and polish one for you — in any size')).toBeVisible({ timeout: 30000 });

    await page.getByRole('button', { name: 'Discover Cut for You™' }).first().click();
    await page.getByTitle('Oval', { exact: true }).getByRole('img').click()
    //Add sliding here
    await page.getByRole('link', { name: 'Check availability' }).click();
    await expect(page.getByText('We’re ready to Cut for You')).toBeVisible({ timeout: 30000 });

    // await expect(page.getByRole('heading', { name: 'We’re ready to Cut for You™' }));
    await page.getByRole('button', { name: 'Select and add a setting' }).click()

    // await page.getByRole('link', { name: 'Complete & review your ring' }).click()
    // await page.getByRole('button', { name: 'Add to bag' }).click();
    // await page.getByRole('button', { name: 'Checkout' }).click();

});
