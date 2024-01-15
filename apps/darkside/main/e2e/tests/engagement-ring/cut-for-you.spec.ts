import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";

/**
 * Cut for you flow
 * Need to include slider
 */

test.describe("Setting First flow - Discover Cut for You flow", () => {

  test("Happy flow - Discover Cut for You flow", async ({ homePage , page,settingPage,productDetailedPage,diamondTablePage,checkoutSlidePage,checkoutPage}) => {

    const expectedCart = new QACart();
    
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select an engagement ring", async () => {

      await homePage.navigateToEngagementStartWithASetting();
      await settingPage.selectDiamondType('Trillion')
      await settingPage.selectSettingBySettingName('Classic Hidden Halo')

      await productDetailedPage.selectDiamondShape('Asscher');

      const settingPrice = await productDetailedPage.getItemPrice()

      expectedCart.addItem(1,"The Classic Hidden Halo", settingPrice ,1);

      await productDetailedPage.clickSelectYourVRAICreatedDiamond();
   });  

    await test.step("Select Cut For You", async () => {

      await diamondTablePage.clickDiscoverCutForYou()
      //Add sliding here
      await diamondTablePage.clickCheckAvailability();
      const cfyDiamondPrice = await diamondTablePage.getCutForYouDiamondPrice();

      expectedCart.addItem(2,"diamond", cfyDiamondPrice ,1);
      await page.waitForTimeout(2000);
      await diamondTablePage.clickCompleteAndReviewRing();


    });

    await test.step("Checkout and verify pricing", async () => {

      const itemPrice = await productDetailedPage.getItemPrice();

      console.log(' Jewerly price -> ' + itemPrice);

      await productDetailedPage.clickAddToBag();

      await checkoutSlidePage.clickCheckout()
      const checkoutTotal = await checkoutPage.getCheckoutTotal();

      await expect(+checkoutTotal).toBe(+itemPrice);

    }); 

  })
});

