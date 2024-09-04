import { Builder } from 'selenium-webdriver';
import { expect } from 'chai';
import { InventoryPage } from '../../Pages/sauceDemoWeb/InventoryPage.js';
import { CartPage } from '../../Pages/sauceDemoWeb/CartPage.js';
import { LoginPage } from '../../Pages/sauceDemoWeb/LoginPage.js';
import { CheckoutStepOne } from '../../Pages/sauceDemoWeb/CheckoutStepOnePage.js';
import { CheckoutStepTwo } from '../../Pages/sauceDemoWeb/CheckoutStepTwoPage.js';
import { CheckoutComplete } from '../../Pages/sauceDemoWeb/CheckoutComplete.js';

describe('End to End Test', function () {
  this.timeout(30000); // Increase timeout for the entire describe block

  let driver;

  before(async function () {
    driver = await new Builder().forBrowser('chrome').build();
    // Maksimalkan ukuran window browser
    await driver.manage().window().maximize();
  });

  after(async function () {
    await driver.quit();
  });
  it('Add item to chart and checkout ', async () => {
    // Buka halaman login
    await driver.get('https://www.saucedemo.com/');

    // Inisialisasi page object
    const loginPage = new LoginPage(driver);

    // Melakukan login dengan menggunakan data uji
    await loginPage.login('standard_user', 'secret_sauce');

    const page = new InventoryPage(driver);

    await page.filterItem();

    await page.chooseSelectedItems([
      'Sauce Labs Backpack',
      'Sauce Labs Onesie',
      'Test.allTheThings() T-Shirt (Red)',
    ]);

    await page.clickChart();

    const cartPage = new CartPage(driver);
    let totalPriceItem = await cartPage.getTotalPrice();
    // console.log(totalPriceItem);

    cartPage.clickCheckout();

    const checkoutStepOnePage = new CheckoutStepOne(driver);
    checkoutStepOnePage.fillForm('Adrian', 'Rafly', '12345');
    await driver.sleep(3000);

    checkoutStepOnePage.clickContinueButton();

    await driver.sleep(3000);

    const checkoutStepTwoPage = new CheckoutStepTwo(driver);
    let totalPricesBeforeTax = await checkoutStepTwoPage.priceTotalBeforeTax();
    // console.log(totalPricesBeforeTax);
    expect(totalPriceItem).equal(totalPricesBeforeTax);

    let totalPriceAfterTax = await checkoutStepTwoPage.priceTotalAfterTax();
    expect(totalPricesBeforeTax).lessThan(totalPriceAfterTax);

    await checkoutStepTwoPage.clickFinishButton();

    const checkoutComplete = new CheckoutComplete(driver);
    await checkoutComplete.orderComplete();

    checkoutComplete.clickBackHomeButton();
  });
});
