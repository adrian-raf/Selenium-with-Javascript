import { By, until } from 'selenium-webdriver';

export class LoginPage {
  constructor(driver) {
    this.driver = driver;
    this.usernameField = By.name('user-name');
    this.passwordField = By.name('password');
    this.loginButton = By.name('login-button');
  }

  async enterUsername(username) {
    const usernameField = await this.driver.wait(until.elementLocated(this.usernameField), 10000);
    await usernameField.sendKeys(username);
  }

  async enterPassword(password) {
    const passwordField = await this.driver.wait(until.elementLocated(this.passwordField), 10000);
    await passwordField.sendKeys(password);
  }

  async clickLoginButton() {
    const loginButton = await this.driver.wait(until.elementLocated(this.loginButton), 10000);
    await loginButton.click();
  }

  async login(username, password) {
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
    // Tunggu sampai halaman inventory dimuat
    await this.driver.wait(until.urlContains('/inventory.html'), 3000);
  }
}
