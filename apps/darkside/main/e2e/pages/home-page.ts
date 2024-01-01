import { expect, Locator, Page } from "@playwright/test";

import { BasePage } from "./base-page";

type jewerlyTypelist =
| 'Explore all jewerly'
| 'Necklaces'
| 'Bracelets'
| 'Earrings'
| 'Rings'
| 'Men\'s jewerly'

export default class HomePage extends BasePage {

  readonly links ={
    engagement: this.page.getByRole('link', { name: "ENGAGEMENT"}),
    diamonds: this.page.getByRole('link', { name: "DIAMONDS"}),
    jewerly: this.page.getByRole('link', { name: "JEWERLY"}),
    startWithASetting: this.page.locator('#primary-navigation').getByRole('link', { name: 'Start with a setting' }),
    startWithAVRAICreatedDiamond: this.page.locator('#primary-navigation').getByRole('link', { name: 'Start with a VRAI created diamond' })


  }

  settingTitle: Locator;
  diamondPageTitle: Locator;

  constructor( page: Page){
    super(page);
    this.settingTitle = page.locator('text=Engagement ring settings');
    this.diamondPageTitle = page.locator('text=Select your VRAI created diamond')

  }

  async open() {
    await super.open('/');   
  }
  async openURL(url) {
    await super.open(url);   
  }

  async navigateToEngagementStartWithASetting(){
    await this.links.engagement.first().hover();
    await this.links.startWithASetting.click();
    await expect(this.settingTitle.first()).toBeVisible();  
  }

  async navigateToEngagementStartWithAVRAICreatedDiamond(){
    await this.links.engagement.first().hover();
    await this.links.startWithAVRAICreatedDiamond.click();
    await expect(this.diamondPageTitle.first()).toBeVisible();  
  }

  async navigateToJewery(jewerlyType : jewerlyTypelist){
    await this.page.getByRole('link', { name: 'JEWELRY' }).first().hover();
    await this.page.getByRole('link', { name: `${jewerlyType}` }).click();
  }
}