import { Locator, Page } from "@playwright/test";

import { BasePage } from "../base-page";

export default class CheckoutSlidePage extends BasePage {

    readonly giftNoteBtn : Locator
    readonly giftNoteTextArea : Locator
    readonly cancelBtn : Locator
    readonly checkoutBtn : Locator
    readonly addGiftNoteBtn: Locator

    constructor(page : Page){
        super(page);
        this.giftNoteBtn = page.getByRole('button', {name: 'Add gift note'})
        this.giftNoteTextArea =  page.locator('textarea')
        this.cancelBtn = page.getByRole('button', {name: 'Cancel'})
        this.checkoutBtn = page.getByRole('button', { name: 'Checkout |'})
        this.giftNoteBtn =page.getByRole('button', { name: 'Add gift note' });
        this.addGiftNoteBtn = page.getByRole('button', {name: 'Add Gift Note', exact: true});
    }

    async addGiftNote(giftMessage){
        await this.giftNoteBtn.click();
        await this.giftNoteTextArea.click();
        await this.giftNoteTextArea.fill(giftMessage);
        await this.addGiftNoteBtn.click();
    }

    async clickCheckout(){
        await this.checkoutBtn.click();

       // expect(this.page.innerText('.dynamic-checkout__title')).toBe('Express checkout');
    }



}