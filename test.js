const { openAdsBySerialNumber, stopAdsBySerialNumber } = require('./utils');
const puppeteer = require('puppeteer');
const { getTwitterCode } = require('./getTwitterCode');
const { SIGN_UP } = require('./selectors');

(async () => {
  const serial_number = 140;
  const browserWSEndpoint = await openAdsBySerialNumber(serial_number);
  console.log('browserWSEndpoint = ', browserWSEndpoint);
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });
  const page = await browser.newPage();
  await page.goto('https://twitter.com/');
  await page.waitForSelector(SIGN_UP);
  await page.screenshot({ path: './screen.png' });
  await stopAdsBySerialNumber(serial_number);

  // await page.click('img[class="logo"]');

  // getTwitterCode(puppeteer);
})();
