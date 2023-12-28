import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";
import { StringHelper } from "../../utils/StringHelper";

/**
 * Setting First flow - Signature Halo setting and Emerald 
 * Issue with data - Test not ready
 */

test.describe("Setting First flow - Toi et Moi flow'", () => {


  test("Happy flow - verify price", async ({ homePage , page}) => {

    const expectedCart = new QACart();

    
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Toi et Moi", async () => {

      await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();
      await page.getByRole('button', { name: 'Start with a setting' }).click();
      await expect(page.locator("h1").first()).toHaveText('Engagement ring settings', { timeout: 20000 });
      await page.getByRole('link', { name: 'The Toi et Moi' }).first().click();
      //Below might not work
      await page.locator('xpath=//div[@type=\'diamond-type-round-brilliant+pear\']').click()

    });  

    await test.step("Select VRAI created diamond", async () => {
      await page.getByRole('button', { name: 'Select your VRAI created diamond' }).click();
      const row2 = await page.textContent("[data-id='2']");

      const diamondPrice = row2.substring(row2.indexOf("$")+1).replace(',','');

      expectedCart.addItem(2, "diamonds", Number(diamondPrice)*100 ,1);
      await page.click("[data-id='2']");
      await page.getByRole('button', { name: 'Select' }).click();

    });

    await test.step("Checkout and verify pricing", async () => {

      await page.getByRole('button', { name: 'Add to bag' }).click();
      await page.getByRole('button', { name: 'Checkout' }).click();

      let total = await page.locator('tfoot').getByText('$').textContent();

      total = total.substring(1).trim();
      console.log('Actual total -> ' + total)
  
      expectedCart.displayCart();
     
      expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))

    }); 

  })
});

