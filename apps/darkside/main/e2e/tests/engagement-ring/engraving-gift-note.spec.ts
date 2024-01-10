import { test } from "../../pages/page-fixture";

/**
 * Verify engraving and Gift note are showing at checkout
 * ISSUE : DIA-1231
 */

test.describe("Engagement ring - Setting First flow", () => {


      // eslint-disable-next-line playwright/expect-expect
  test.skip("Happy Path with engraving and gift note", async ({ homePage , settingPage,productDetailedPage,diamondTablePage,checkoutSlidePage,checkoutPage}) => {

    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select Engagement ring", async () => {

      await homePage.navigateToEngagementStartWithASetting()

      await settingPage.selectDiamondType('Asscher');
      await settingPage.selectSettingBySettingName('The Three Stone')
    
      await productDetailedPage.clickSelectYourVRAICreatedDiamond();

      

    });  

    await test.step("Select VRAI created diamond for type Asscher", async () => {
      // verify Asscher is selected
      await diamondTablePage.selectDiamondByRow(4);
    });

    await test.step("Add engraving and gift note", async () => {
      await productDetailedPage.addEngraving('QA Notes')
      await productDetailedPage.clickAddToBag()
      await checkoutSlidePage.addGiftNote('Test gift note');

    }); 
        
    await test.step("Add engraving and gift note", async () => {
      await checkoutSlidePage.clickCheckout();
      await checkoutPage.verifyCheckoutPage();

    });
  })
});

