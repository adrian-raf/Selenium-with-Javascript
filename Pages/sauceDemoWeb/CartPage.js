import { By, until } from 'selenium-webdriver';
import { expect, assert } from 'chai';

export class CartPage {
  constructor(driver) {
    this.driver = driver;
    this.remove = By.className('btn btn_secondary btn_small cart_button');
    this.checkout = By.id('checkout');
    this.continueToShopping = By.id('continue-shopping');
    this.itemPrice = By.className('inventory_item_price');
  }

  async removeItem(names) {
    // 1. Daftar item yang ingin dihapus sesuai dengan nama item yang ditulis pada parameter names

    // 2. Identifikasi dan hapus item yang sesuai
    let cartItems = await this.driver.findElements(By.className('cart_item'));

    for (let item of cartItems) {
      let nameElement = await item.findElement(By.className('inventory_item_name'));
      let name = await nameElement.getText();

      if (names.includes(name)) {
        let removeButton = await item.findElement(this.remove);
        await removeButton.click();
        console.log(`${name} telah dihapus dari keranjang.`);
      }
    }
  }

  async getTotalPrice() {
    let priceElements = await this.driver.findElements(this.itemPrice);
    let totalPrice = 0;
    for (let element of priceElements) {
      let priceText = await element.getText();
      let priceNumber = parseFloat(priceText.replace('$', ''));
      totalPrice += priceNumber;
    }
    return totalPrice;
  }

  async clickCheckout() {
    await this.driver.findElement(this.checkout).click();
    await this.driver.wait(until.urlContains('/checkout-step-one.html'), 3000);
  }

  async clickContinuetoShopping() {
    await this.driver.findElement(this.continueToShopping).click();
    await this.driver.wait(until.urlContains('/inventory.html'), 3000);
  }
}
