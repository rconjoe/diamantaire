module.exports = { settingFirstFlow };
 
async function settingFirstFlow(page, vuContext, events, test) {
    //1. simply add this line to your scenario function, or use test.step below instead
   const { step } = test;
   const userid = vuContext.vars.userid;
   const recordid = vuContext.vars.recordid;
  
   await step("Visit VRAI page", async () => {
    await page.goto("https://main.vrai.qa");

   })

  await step("Choose a ring setting ", async () => {


    await page.getByRole('link', { name: 'ENGAGEMENT' }).first().hover();

    await page.getByRole('link', { name: 'Start with a setting' }).click();
    //await page.locator('#primary-navigation').getByRole('link', { name: 'Start with a setting' }).click();

    //await page.locator('#primary-navigation').getByRole('link', { name: 'Start with a setting' }).click()
    //await expect(page.locator("h1").first()).toHaveText('Engagement ring settings');
    await page.getByRole('link').filter({ hasText: 'The Classic Hidden Halo' }).getByRole('button').first().click();
   // await page.getByRole('link', { name: 'The Classic Hidden Halo' }).click();
    await page.getByRole('button', { name: 'Emerald' }).click()

    })

    await step("Select VRAI created diamond", async () => {


      //await page.getByRole('button', { name: 'Select your diamond' }).click();
      await page.getByRole('button',{name:' Select your VRAI created diamond'}).click();
      await page.click("[data-id='2']");
      await page.getByRole('button', { name: 'Select' }).click();
      await page.waitForLoadState('domcontentloaded');
     // await page.waitForTimeout(5000); //replace this with better later. It is throwing some error since test is clicking too fast
      })

    await step("Add to bag and checkout", async () => {


      await page.getByRole('button', { name: 'Add to bag' }).click();
      await page.waitForTimeout(2000); //replace this with better later. It is throwing some error since test is clicking too fast

      await page.getByRole('button', { name: 'Checkout' }).click();
    })
}
