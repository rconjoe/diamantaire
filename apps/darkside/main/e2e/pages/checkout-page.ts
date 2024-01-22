import { expect } from "@playwright/test";

import { BasePage } from "./base-page";


export default class CheckoutPage extends BasePage {


  async verifyCheckoutPage(){
    
    const element = await this.page.getByText('Express Checkout');

    await expect(element !== undefined ).toBeTruthy();  

    
  }

  async getCheckoutTotal() : Promise<number> {
    let total = await this.page.locator('tfoot').getByText('$').textContent();

    total = total.replace(/[^\d.-]/g, '');
    console.log('Final Checkout total -> ' + total)

    return Number(total);
  }
}