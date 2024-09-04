import { By, Builder, until } from 'selenium-webdriver';
import { LoginPage } from '../../Pages/sauceDemoWeb/LoginPage.js';

describe('Login Page sauce lab', function () {
  it('Login with Valid Data', async function () {
    let driver = await new Builder().forBrowser('chrome').build();

    try {
      // Navigasi ke halaman login
      await driver.get('https://www.saucedemo.com/');

      // Inisialisasi page object
      const loginPage = new LoginPage(driver);

      // Melakukan login dengan menggunakan data uji
      await loginPage.login('standard_user', 'secret_sauce');

      await driver.wait(until.urlContains('/inventory.html'), 5000);

      // Tambahkan assertion di sini untuk memastikan login berhasil
      // Contoh, menunggu elemen tertentu yang muncul setelah login
      const dashboardTitle = await driver.wait(until.elementLocated(By.className('title')), 10000);
      const headerText = await dashboardTitle.getText();
      if (headerText !== 'Products') {
        throw new Error('Login failed, Dashboard not loaded');
      }

      await driver.sleep(3000);
    } catch (error) {
      console.error('Error:', error.message);
    } finally {
      await driver.quit();
    }
  });
});
