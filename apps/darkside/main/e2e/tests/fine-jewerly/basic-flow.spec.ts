import { test, expect } from '@playwright/test';
import { QACart } from '../../model/qacart-model';
import { StringHelper } from '../../utils/StringHelper';


/**
 * Fine Jewery - Basic flow. Neclace , filtering  
 *  
 */
test('Setting First flow - Happy flow', async ({ page })=> {

    const expectedCart = new QACart();
    await page.goto('/');

    await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
    await page.getByRole('link', { name: 'Necklaces' }).click();

    // Need to update test once filtering is fixed
    // await page.getByRole('button', { name: 'Metal' }).click();
    // await page.getByRole('button', { name: 'Yellow Gold'}).first().click();
    // await page.getByRole('button', { name: 'Shape' }).click();
    // await page.locator('li > .flex').first().click()
    // await page.getByRole('button', { name: 'Styles' }).click();
    // await page.locator('li').filter({ hasText: 'Statement' }).getByRole('button').click()
    
    await page.getByRole('button', { name: 'North Star Medallion' }).click();
    await expect(page.getByText('Starting at $')).toHaveText('Starting at $425');

    await page.getByRole('button', { name: 'Add to bag' }).click();

    let price = await page.textContent("li.checkout-button > div > button");
    let jewerlyPrice = StringHelper.extractPrice(price)*100
    expectedCart.addItem(1, 'North Star Medallion', jewerlyPrice);
    expectedCart.displayCart();

    await page.waitForLoadState();
    await expect(page.getByRole('button', { name: 'Checkout' })).toContainText('$425');
    await page.getByRole('button', { name: 'Checkout' }).click();

    let total = await page.locator('tfoot').getByText('$').textContent();
    total = total.substring(1).trim();
    
    expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))



});
