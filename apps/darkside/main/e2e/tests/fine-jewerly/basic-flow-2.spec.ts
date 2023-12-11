import { test, expect } from "../../pages/page-fixture";

// test.beforeEach(async ({ page }, testInfo) => {
//   console.log(`Running ${testInfo.title}`);
//   await page.goto('/');
// });

/**
 * Not ready to commit
 */
test.describe("Basic flow - setting first", () => {

  test("Open Home Page", async ({ homePage }) => {
    await test.step("open home page", async () => {
      await homePage.open();
    });

    await test.step("Select a setting", async () => {
     // await homePage.
    }); 



});

//Need to create a class to hold information
//verify the item price vs checkout price = same
//Need to work on slider 
//Add more assertion
//



// test('Setting First flow - Happy flow', async ({ page })=> {
//     await page.getByRole('link', { name: 'JEWELRY' }).first().hover();
//     await page.getByRole('link', { name: 'Necklaces' }).click();


//     await page.getByRole('button', { name: 'North Star Medallion' }).click();
//     await expect(page.getByText('Starting at $')).toHaveText('Starting at $425');
//     // price-text
    
//     await page.getByRole('button', { name: 'Add to bag' }).click();
//     await page.waitForLoadState();
//     await expect(page.getByRole('button', { name: 'Checkout' })).toContainText('$425');

//     await page.getByRole('button', { name: 'Checkout' }).click();

// });
