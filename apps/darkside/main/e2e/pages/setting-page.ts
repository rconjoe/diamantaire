import { expect, Locator, Page } from "@playwright/test";

import HomePage from "./home-page";


type diamondType =
| "Asscher"
| "Round Brilliant"
| "Oval"
| "Emerald"
| "Pavé Marquise"
| "Pavé Cushion"
| "Pear"
| "Trillion"
| "Princess"
| "Radiant";

type metalList = 
| "Platinum"
| "Rose Gold"
| "White Gold"
| "Yellow Gold"


export default class SettingPage extends HomePage {

  readonly metalFilter ={
    platinum: this.page.getByRole('button', { name: "Platinum"}),
    roseGold: this.page.getByRole('button', { name: "Rose Gold"}),
    whiteGold: this.page.getByRole('button', { name: "White Gold"}),
    yellowGold: this.page.getByRole('button', { name: "Yellow Gold"}),
  }

 

  readonly diamondTypeFilter ={
    asscher: this.page.locator('button').filter({ hasText: 'Asscher' }),
    roundBrilliant: this.page.locator('button').filter({ hasText: 'Round Brilliant' }),
    oval: this.page.locator('button').filter({ hasText: 'Oval' }),
    emerald: this.page.locator('button').filter({ hasText: 'Emerald' }),
    paveMarquise: this.page.locator('button').filter({ hasText: 'Pavé Marquise' }),
    paveCushion: this.page.locator('button').filter({ hasText: 'Pavé Cushion' }),
    pear: this.page.locator('button').filter({ hasText: 'Pear' }),
    trillion: this.page.locator('button').filter({ hasText: 'Trillion' }),
    princess: this.page.locator('button').filter({ hasText: 'Princess' }),
    radiant: this.page.locator('button').filter({ hasText: 'Radiant' }),

  }

  constructor( page: Page){
    super(page);
  }

  async checkAllFilters(){
    await this.metalFilter.platinum.click();
    await this.metalFilter.roseGold.click();
    await this.metalFilter.whiteGold.click();
    await this.metalFilter.platinum.click();
  }

  //They are working. But not sure why test will failed after 4 times.
  async checkAllDiamondType(){

    await this.diamondTypeFilter.roundBrilliant.click();
    await this.diamondTypeFilter.asscher.click();
    await this.diamondTypeFilter.roundBrilliant.click();
    await this.diamondTypeFilter.oval.click();
    
    await this.diamondTypeFilter.emerald.click();
    await this.diamondTypeFilter.paveMarquise.click();
    await this.diamondTypeFilter.paveCushion.click();
    await this.diamondTypeFilter.pear.click();
    await this.diamondTypeFilter.trillion.click();
    await this.diamondTypeFilter.princess.click();
    await this.diamondTypeFilter.radiant.click();
  }

  async selectDiamondType(diamond : diamondType){
    await this.page.locator('button').filter({ hasText: `${diamond}`})
  }

  async selectMetalType(metal : metalList){
    await this.page.locator('button').filter({ hasText: `${metal}`})
  }

  async selectSettingBySettingName(settingName){
    console.log(`Select Setting ${settingName}`);
    
    await this.page.waitForTimeout(2000); // for stability
    // await this.page.getByRole('link', { name: `${settingName}` }).click();
    await this.page.getByRole('link').filter({ hasText: `${settingName}`}).getByRole('button').first().click();

    // await page.goto('https://darkside-main-jy5ehhfj0.vrai.qa/engagement-rings/settings');
    // await page.getByRole('link', { name: 'undefined Round Brilliant | Yellow Gold The Classic Hidden Halo Round Brilliant in Yellow gold | $1,100+' }).getByRole('button').first().click();

  }
  
}