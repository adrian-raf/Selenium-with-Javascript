import { By, until } from 'selenium-webdriver';
import { expect, should } from 'chai';

export class CheckoutComplete {
  constructor(driver) {
    this.driver = driver;
    this.title = By.className('title');
    this.completeHeader = By.className('complete-header');
    this.completeText = By.className('complete-text');
    this.backToProductButton = By.id('back-to-products');
  }

  async orderComplete() {
    const title = await this.driver.findElement(this.title);
    const description = await this.driver.findElement(this.completeHeader).isDisplayed();
    const headerText = await this.driver.findElement(this.completeHeader).getText();
    expect(title).to.exist;
    expect(description).to.be.true;
    expect(headerText).to.equal('Thank you for your order!');
  }

  async clickBackHomeButton() {
    await this.driver.findElement(this.backToProductButton).click();
    await this.driver.wait(until.urlContains('/inventory.html'), 3000);
  }
}
