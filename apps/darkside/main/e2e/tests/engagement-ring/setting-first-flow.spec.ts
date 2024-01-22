import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";

/**
 * Setting First flow - Signature Halo setting and Emerald 
 * ISSUE : DIA-1231
 */

test.describe("Setting First flow - Happy flow", () => {

  test.skip("Happy flow - verify price", async ({ homePage ,settingPage,productDetailedPage,diamondTablePage,checkoutSlidePage , checkoutPage}) => {

    const expectedCart = new QACart();

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Engagement ring", async () => {

      await homePage.navigateToEngagementStartWithASetting();
      await settingPage.selectSettingBySettingName('The Classic Hidden Halo');
      await productDetailedPage.selectDiamondShape('Emerald');

      const settingPrice = await productDetailedPage.getItemPrice();

      expectedCart.addItem(1, "Setting", settingPrice,1)
  
    });  

    await test.step("Select VRAI created diamond for type Emerald and capture diamond price", async () => {
      await productDetailedPage.clickSelectYourVRAICreatedDiamond();
      const diamondPrice = await diamondTablePage.getDiamondPriceByRow(4);

      await diamondTablePage.selectDiamondByRow(4)

       expectedCart.addItem(2, "diamonds", diamondPrice ,1);
    });

    await test.step("Checkout and verify pricing", async () => {

      await productDetailedPage.clickAddToBag()
      await checkoutSlidePage.clickCheckout()

      const total = await checkoutPage.getCheckoutTotal()

      console.log('Actual total -> ' + total)
  
      expectedCart.displayCart();
     
      expect(+total).toBe(Number(expectedCart.calculateTotal()))

    }); 

  })
});

