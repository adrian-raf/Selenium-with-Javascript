import { By, until } from 'selenium-webdriver';

export class CheckoutStepOne {
  constructor(driver) {
    this.driver = driver;
    this.firstNameInput = By.id('first-name');
    this.lastNameInput = By.id('last-name');
    this.postalCode = By.id('postal-code');
    this.continueButton = By.id('continue');
    this.cancelButton = By.id('cancel');
  }

  async fillForm(firstname, lastname, postalcode) {
    const fillFirstName = await this.driver.wait(until.elementLocated(this.firstNameInput), 3000);
    const filllastName = await this.driver.wait(until.elementLocated(this.lastNameInput), 3000);
    const fillPostalCode = await this.driver.wait(until.elementLocated(this.postalCode), 3000);
    await fillFirstName.sendKeys(firstname);
    await filllastName.sendKeys(lastname);
    await fillPostalCode.sendKeys(postalcode);
  }

  async clickContinueButton() {
    const clickContinue = await this.driver.wait(until.elementLocated(this.continueButton), 3000);
    await clickContinue.click();
    await this.driver.wait(until.urlContains('/checkout-step-two.html'), 3000);
  }
  async clickCancelButton() {
    await this.driver.findElement(this.cancelButton).click();
    await this.driver.wait(until.urlContains('/cart.html'), 3000);
  }
}
