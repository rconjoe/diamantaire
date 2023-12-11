import { test, expect } from "../../pages/page-fixture";
import { QACart } from '../../model/qacart-model';
import { StringHelper } from '../../utils/StringHelper';


/**
 * Engagement right - diamond first flow 
 */
test('Diamond First flow - Happy flow', async ({ page})=> {

    const expectedCart = new QACart();
    await page.goto('/');
    await page.getByRole('link', { name: 'Diamonds' }).first().hover();;
    await page.locator('#primary-navigation').getByRole('link', { name: 'Start with a VRAI created diamond' }).click();

    let row2 = await page.textContent("[data-id='2']");
    row2 = row2.substring(row2.indexOf("$")+1).replace(',','');
    console.log('Diamond price -> ' + row2)
    expectedCart.addItem(1, "diamonds", Number(row2)*100 ,1);

    await page.click("[data-id='2']");
    await page.getByRole('button', { name: 'Select' }).click();


    await page.locator('div').filter({ hasText: /^V Engagement Ring*/ }).getByRole('button').nth(3).click()
    let settingPriceText = await page.getByText('Starting at $').textContent();

    var settingPrice : number = StringHelper.extractPrice(settingPriceText)
    expectedCart.addItem(2,"Setting", settingPrice*100 ,1);

   await page.getByRole('button', { name: 'Next' }).click();
   await page.getByRole('button', { name: 'Add to bag' }).click();
   await page.getByRole('button', { name: 'Checkout' }).click();

   let total = await page.locator('tfoot').getByText('$').textContent();
   total = total.substring(1).trim();
   console.log('Actual total -> ' + total)

   expectedCart.displayCart();
   
  //\ let newTotal = checkoutPage.getCheckoutTotal();
    
   expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))


});
