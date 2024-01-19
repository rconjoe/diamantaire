import { Page } from "@playwright/test";

import HomePage from "./home-page";
import { diamondList,metalList } from "../model/filterLists";



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

  async selectDiamondType(diamond : diamondList){
    await this.page.locator('button').filter({ hasText: `${diamond}`}).click()
  }

  async selectMetalType(metal : metalList){
    await this.page.locator('button').filter({ hasText: `${metal}`}).click()
  }

  async selectSettingBySettingName(settingName){
    console.log(`Select Setting ${settingName}`);
    // eslint-disable-next-line playwright/no-wait-for-timeout
    await this.page.waitForTimeout(2000); // for stability
    await this.page.getByRole('link').filter({ hasText: `${settingName}`}).getByRole('button').first().click();
  }
  
}