import { By, until } from 'selenium-webdriver';
import { expect } from 'chai';

export class CheckoutStepTwo {
  constructor(driver) {
    this.driver = driver;
    this.itemTotal = By.className('summary_subtotal_label');
    this.tax = By.className('summary_tax_label');
    this.totalAfterTax = By.className('summary_total_label');
    this.finishButton = By.id('finish');
    this.cancelButton = By.id('cancel');
  }

  async priceTotalBeforeTax() {
    const totalPrice = await this.driver.findElement(this.itemTotal);
    let priceText = await totalPrice.getText();
    let priceNumber = parseFloat(priceText.replace(/[^0-9.]/g, ''));
    return priceNumber;
  }

  async priceTotalAfterTax() {
    const totalBeforeTax = await this.priceTotalBeforeTax();
    const taxPrice = await this.driver.findElement(this.tax);
    let taxText = await taxPrice.getText();
    let taxNumber = parseFloat(taxText.replace(/[^0-9.]/g, ''));

    const priceAfterTax = totalBeforeTax + taxNumber;
    // console.log(priceAfterTax);

    const totalPlusTax = await this.driver.findElement(this.totalAfterTax);
    let totalPlusTaxText = await totalPlusTax.getText();
    let totalPlusTaxNumber = parseFloat(totalPlusTaxText.replace(/[^0-9.]/g, ''));
    expect(priceAfterTax).equal(totalPlusTaxNumber);
    return priceAfterTax;
  }

  async clickFinishButton() {
    await this.driver.findElement(this.finishButton).click();
    await this.driver.wait(until.urlContains('/checkout-complete.html'), 3000);
  }

  async clickCancelButton() {
    await this.driver.findElement(this.cancelButton).click();
    await this.driver.wait(until.urlContains('/inventory.html'), 3000);
  }
}
