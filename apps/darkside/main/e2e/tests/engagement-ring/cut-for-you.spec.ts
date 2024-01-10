import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";
import { StringHelper } from "../../utils/StringHelper";

/**
 * Cut for you flow
 * Need to include slider
 * Issue with flow - Test not ready
 * DIA-1235
 */

test.describe("Setting First flow - Discover Cut for You flow", () => {

  test.skip("Happy flow - Discover Cut for You flow", async ({ homePage , page,settingPage,productDetailedPage,diamondTablePage}) => {

    const expectedCart = new QACart();
    
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select an engagement ring", async () => {

      await homePage.navigateToEngagementStartWithASetting();
      await settingPage.selectDiamondType('Trillion')
      await settingPage.selectSettingBySettingName('Classic Hidden Halo')

      await productDetailedPage.selectDiamondShape('Oval');

      //Need further investigation
      //await productDetailedPage.selectMetalType('18k White gold')


      const settingPrice = await productDetailedPage.getItemPrice()

      // const settingPriceText = await page.getByText('Starting at $').textContent();
      // const settingPrice : number = StringHelper.extractPrice(settingPriceText);

      expectedCart.addItem(1,"The Classic Hidden Halo", settingPrice ,1);

      await productDetailedPage.clickSelectYourVRAICreatedDiamond();
      //await productDetailedPage.clickSelectYourDiamond();
  

      // await page.getByRole('button', { name: 'Select your diamond' }).click();
    });  

    await test.step("Select Cut For You", async () => {

      await diamondTablePage.clickDiscoverCutForYou()
      await diamondTablePage.selectCutForMeDiamondShape('Oval')

      // await expect(page.getByText("We’ll cut and polish one for you — in any size").first()).toBeVisible({ timeout: 30000 });

      // await page.getByRole('button', { name: 'Discover Cut for You™' }).first().click();


      //await page.getByTitle('Oval', { exact: true }).getByRole('img').click()
      //Add sliding here
      await diamondTablePage.clickCheckAvailability();

      const summaryPrice =  await productDetailedPage.getItemPrice()

      // await page.getByRole('link', { name: 'Check availability' }).click();
      // await expect(page.getByText('We’re ready to Cut for You')).toBeVisible({ timeout: 30000 });
      // const priceTitle = await page.locator('.price-title').getByText('$').textContent();

      // const summaryPrice = StringHelper.extractPrice(priceTitle);

      // console.log('Summary ' + summaryPrice);

      // console.log(summaryPrice);
      
      expectedCart.addItem(2,"diamond", summaryPrice ,1);

      await page.getByRole('link', { name: 'Complete & review your ring' }).click()

    });

    await test.step("Checkout and verify pricing", async () => {

      await page.getByRole('button', { name: 'Add to bag' }).click();

      await expect(page.getByRole('button', { name: 'Checkout' })).toBeVisible();
      await page.getByRole('button', { name: 'Checkout' }).click();

      let total = await page.locator('tfoot').getByText('$').textContent();

      total = total.substring(1).trim();
      console.log('Actual total -> ' + total)
  
      expectedCart.displayCart();
     
      expect(StringHelper.extractPrice(total)).toBe(Number(expectedCart.calculateTotal()))

    }); 

  })
});

