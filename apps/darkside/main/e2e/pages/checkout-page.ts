import { BasePage } from "./base-page";

export default class CheckoutPage extends BasePage {

  async open() {
    await super.open("/");
  }

  

  async getCheckoutTotal() : Promise<Number> {
    let total = await this.page.locator('tfoot').getByText('$').textContent();
    total = total.substring(1).trim();
    console.log('Actual total -> ' + total)
    return Number(total);
  }
}