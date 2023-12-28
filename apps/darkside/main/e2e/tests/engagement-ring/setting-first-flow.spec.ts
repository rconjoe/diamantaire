import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";
import { StringHelper } from "../../utils/StringHelper";

/**
 * Setting First flow - Signature Halo setting and Emerald 
 */

test.describe("Setting First flow - Happy flow", () => {


  test.fixme("Happy flow - verify price", async ({ homePage , page}) => {

    const expectedCart = new QACart();

    
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Engagement ring", async () => {

      await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();
      await page.locator('#primary-navigation').getByRole('link', { name: 'Start with a setting' }).click()
      await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
//      await page.getByRole('option', { name: 'Oval' }).click()
      await page.getByRole('link', { name: 'The Classic Hidden Halo' }).click();
      await page.getByRole('button', { name: 'Emerald' }).click()
      const settingPrice = await page.getByText('Starting at $').textContent();

      expectedCart.addItem(1, "Setting", StringHelper.extractPrice(settingPrice)*100,1)
     // await page.locator('xpath=//div[@type=\'diamond-type-emerald\']/parent::button[contains(@class,\'diamondTypeOption\')]').click()
      expectedCart.displayCart();
  
    });  

    await test.step("Select VRAI created diamond for type Emerald and capture diamond price", async () => {
      await page.getByRole('button', { name: 'Select your VRAI created diamond' }).click();
      const row2 = await page.textContent("[data-id='2']");
      const diamondPrice = row2.substring(row2.indexOf("$")+1).replace(',','');

      console.log('Diamonds price -> '+ diamondPrice);

      expectedCart.addItem(2, "diamonds", Number(diamondPrice)*100 ,1);
      await page.click("[data-id='2']");
      await page.getByRole('button', { name: 'Select' }).click();

    });

    await test.step("Checkout and verify pricing", async () => {

      await page.getByRole('button', { name: 'Add to bag' }).click();
      await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();

      await page.getByRole('button', { name: 'Checkout' }).click();

      let total = await page.locator('tfoot').getByText('$').textContent();

      total = total.substring(1).trim();
      console.log('Actual total -> ' + total)
  
     expectedCart.displayCart();
     
    //\ let newTotal = checkoutPage.getCheckoutTotal();
      expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))

    }); 

  })
});

