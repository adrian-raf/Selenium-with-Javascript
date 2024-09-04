import { By, until, Select } from 'selenium-webdriver';
import { expect, assert } from 'chai';

export class InventoryPage {
  constructor(driver) {
    this.driver = driver;
    this.inventoryItemName = By.className('inventory_item_name');
    this.shoppingCart = By.className('shopping_cart_link');
    this.inventoryItemPrice = By.className('inventory_item_price');
    this.productSort = By.className('product_sort_container');
    this.shoppingCartBadge = By.className('shopping_cart_badge');
  }

  async chooseSelectedItems(names) {
    const itemMap = {
      'Sauce Labs Backpack':
        '//div[text()="Sauce Labs Backpack"]/ancestor::div[@class="inventory_item"]//button',
      'Sauce Labs Bike Light':
        '//div[text()="Sauce Labs Bike Light"]/ancestor::div[@class="inventory_item"]//button',
      'Sauce Labs Bolt T-Shirt':
        '//div[text()="Sauce Labs Bolt T-Shirt"]/ancestor::div[@class="inventory_item"]//button',
      'Sauce Labs Fleece Jacket':
        '//div[text()="Sauce Labs Fleece Jacket"]/ancestor::div[@class="inventory_item"]//button',
      'Sauce Labs Onesie':
        '//div[text()="Sauce Labs Onesie"]/ancestor::div[@class="inventory_item"]//button',
      'Test.allTheThings() T-Shirt (Red)':
        '//div[text()="Test.allTheThings() T-Shirt (Red)"]/ancestor::div[@class="inventory_item"]//button',
    };

    for (let name of names) {
      if (itemMap[name]) {
        try {
          const button = await this.driver.wait(
            until.elementLocated(By.xpath(itemMap[name])),
            10000
          );
          await this.driver.wait(until.elementIsVisible(button), 10000);
          await button.click();
          console.log(`Successfully added ${name} to cart`);
        } catch (error) {
          console.warn(`Failed to add ${name} to cart: ${error.message}`);
        }
      } else {
        console.warn(`Invalid item name: ${name}`);
      }
    }

    const CartBadgeText = await this.driver.findElement(this.shoppingCartBadge).getText();
    // jumlah item yang dipilih sama dengan jumlah pada shopping cart badge
    expect(parseInt(CartBadgeText)).to.equal(names.length);
  }

  async clickChart() {
    const clickChartLink = await this.driver.wait(until.elementLocated(this.shoppingCart), 10000);
    clickChartLink.click();
    await this.driver.wait(until.urlContains('/cart.html'), 3000);
  }

  async filterItem() {
    try {
      const selectElement = await this.driver.findElement(this.productSort);
      const select = new Select(selectElement);

      const AtoZ = await this.driver.findElement(By.css('option[value=az]'));

      /**
       * Note :
       * Pastikan Anda mencari elemen setiap kali ingin berinteraksi dengannya. Jangan menyimpan referensi elemen dan menggunakannya berulang-ulang,
       *  karena hal itu dapat menyebabkan referensi elemen menjadi usang.
       */

      // Tunggu hingga elemen opsi 'za' siap dan terlihat
      await this.driver.wait(until.elementLocated(By.css('option[value=za]')), 10000);

      const PriceLowtoHigh = await this.driver.findElement(By.css('option[value=lohi]'));
      const PriceHightoLow = await this.driver.findElement(By.css('option[value=hilo]'));

      // Pilih opsi berdasarkan value 'za'
      await select.selectByValue('za');

      // Cari ulang elemen 'ZtoA' setelah pemilihan
      const ZtoA = await this.driver.findElement(By.css('option[value=za]'));

      // Verifikasi bahwa opsi 'za' telah dipilih
      assert.equal(true, await ZtoA.isSelected());
    } catch (error) {
      console.warn('Error at Inventory Page : ' + error.message);
    }
  }
}
