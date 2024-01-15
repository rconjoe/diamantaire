import { QACart } from "../../model/qacart-model";
import { test, expect } from "../../pages/page-fixture";

/**
 * Setting First flow - Signature Halo setting and Emerald 
 */

test.describe("Setting First flow - Toi et Moi flow'", () => {


  test("Happy flow - verify price", async ({ homePage,productDetailedPage,settingPage,diamondTablePage,checkoutSlidePage,checkoutPage}) => {

    const expectedCart = new QACart();

    
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Toi et Moi", async () => {

      await homePage.navigateToEngagementStartWithASetting()
      await settingPage.selectSettingBySettingName('The Toi et Moi');
      await productDetailedPage.selectToiEtMoiDiamondShape('round-brilliant+pear');

      const settingPrice = await productDetailedPage.getItemPrice();

      expectedCart.addItem(1,"ringSetting",settingPrice,1)
    });  

    await test.step("Select VRAI created diamond", async () => {
      await productDetailedPage.clickSelectYourVRAICreatedDiamond();
      const diamondPrice = await diamondTablePage.getDiamondPriceByRow(2);

      expectedCart.addItem(2, "diamonds", diamondPrice ,1);

      await diamondTablePage.selectDiamondByRow(2);

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

