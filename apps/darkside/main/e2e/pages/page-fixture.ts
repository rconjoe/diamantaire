import { test as base } from "@playwright/test";

import HomePage from "././home-page";
import CheckoutPage from "./checkout-page";

export type PageObjects = {
  homePage: HomePage;
  checkoutPage: CheckoutPage;
};

export const test = base.extend<PageObjects>({
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await homePage.open();

    await use(homePage);
  },
  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

});

export { expect} from "@playwright/test";