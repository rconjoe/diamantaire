import { test, expect } from '@playwright/test';
import { QACart } from '../../model/qacart-model';
import { StringHelper } from '../../utils/StringHelper';


/**
 * Setting First flow - Signature Halo setting and Emerald 
 */

test('Setting First flow - Happy flow', async ({ page })=> {

    const expectedCart = new QACart();

    await page.goto('/');
    await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();
    await page.locator('#primary-navigation').getByRole('link', { name: 'Start with a setting' }).click()
    await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
    await page.getByRole('link', { name: 'Signature Halo' }).click();
    await page.getByRole('button', { name: 'Emerald' }).click()
    let settingPrice = await page.getByText('Starting at $').textContent();

    expectedCart.addItem(1, "Setting", StringHelper.extractPrice(settingPrice)*100,1)
   // await page.locator('xpath=//div[@type=\'diamond-type-emerald\']/parent::button[contains(@class,\'diamondTypeOption\')]').click()
    await page.getByRole('button', { name: 'Select your VRAI created diamond' }).click();

    let row2 = await page.textContent("[data-id='2']");
    let diamondPrice = row2.substring(row2.indexOf("$")+1).replace(',','');
    console.log('Diamond price -> ' + diamondPrice)
    expectedCart.addItem(2, "diamonds", Number(diamondPrice)*100 ,1);
    await page.click("[data-id='2']");

    await page.getByRole('button', { name: 'Select' }).click();
    await page.getByRole('button', { name: 'Add to bag' }).click();
    await page.getByRole('button', { name: 'Checkout' }).click();

    let total = await page.locator('tfoot').getByText('$').textContent();
    total = total.substring(1).trim();
    console.log('Actual total -> ' + total)

   expectedCart.displayCart();
   
  //\ let newTotal = checkoutPage.getCheckoutTotal();
    expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))

});
