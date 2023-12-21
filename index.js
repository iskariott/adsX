const puppeteer = require('puppeteer-extra');
// const puppeteer = require('puppeteer');
const path = require('path');

const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { SIGN_UP, INPUT_NAME, INPUT_EMAIL } = require('./selectors');
const {
  getRandMonth,
  getRandInterval,
  getRandomName,
  getAccListByGroup,
  openAdsBySerialNumber,
  stopAdsBySerialNumber,
} = require('./utils');
const { default: axios } = require('axios');

puppeteer.use(StealthPlugin());

async function process() {
  const accList = await getAccListByGroup('test');
  console.log('accList = ', accList[0].id);
  const browserWSEndpoint = await openAdsBySerialNumber(accList[0].id);
  console.log('browserWSEndpoint = ', browserWSEndpoint);
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });
  const page = await browser.newPage();

  try {
    await page.goto('https://twitter.com/');
    await page.waitForSelector(SIGN_UP);
    await page.click(SIGN_UP);
    await page.waitForSelector(INPUT_NAME);
    await page.type(INPUT_NAME, getRandomName());
    await page.type(INPUT_EMAIL, 'aposskaa@proton.me');
    await page.select('select[id="SELECTOR_1"]', getRandMonth());
    await page.select('select[id="SELECTOR_2"]', getRandInterval(1, 30).toString());
    await page.select('select[id="SELECTOR_3"]', '200' + getRandInterval(0, 5));
    await page.screenshot({ path: './screen.png' });
    await new Promise((r) => setTimeout(r, 2000));
    await page.click('[data-testid="ocfSignupNextLink"]');
    await page.waitForSelector('div[data-testid="ocfSettingsListNextButton"]', { timeout: 5000 });
    await page.click('[data-testid="ocfSettingsListNextButton"]');
    await page.waitForSelector('div[data-testid="ocfSignupReviewNextLink"]', { timeout: 5000 });
    await page.click('[data-testid="ocfSignupReviewNextLink"]');
    // const pk = '2CB16598-CB82-4CF7-B332-5990DB66F3AB';
    // const surl = 'https%3A%2F%2Fclient-api.arkoselabs.com';
    const params = {
      'clientKey': '517be7d57fc09e99152e0c30b7232ede',
      'task': {
        'type': 'FunCaptchaTaskProxyless',
        'websiteURL': 'https://twitter.com/',
        'websitePublicKey': '2CB16598-CB82-4CF7-B332-5990DB66F3AB',
        'userAgent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/117.0.5938.149 Safari/537.36',
      },
      'softId': '3898',
      'callbackUrl': 'https://1.2.3.4/webhooks/captcha',
    };
    await axios.get('https://api.2captcha.com/createTask', { params });
    // console.log('wait fo next');
    // await page.waitForSelector('button[class="sc-nkuzb1-0 sc-d5trka-0 eZxMRy button"]');
    // console.log('next auth');
    // await page.click('button[class="sc-nkuzb1-0 sc-d5trka-0 eZxMRy button"]');
    // console.log('wait captcha');
    // await page.waitForSelector('button[class="sc-nkuzb1-0 yuVdl button"]');
    // console.log('solve');
    // await page.solveRecaptchas();
    // console.log('solved');
    // await new Promise((r) => setTimeout(r, 10000));
  } catch (error) {}
}
process();
// puppeteer
//   .launch({
//     executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
//     // userDataDir: 'Users\\Administrator\\AppData\\Local\\Google\\Chrome\\User Data\\Profile 1',
//     ignoreDefaultArgs: true,
//     headless: false,
//     args: ['--profile-directory="Profile 19"'],
//   })
//   .then(async (browser) => {
//     // const page = await browser.newPage();
//     await new Promise((r) => setTimeout(r, 100000));
//     // await page.goto('https://twitter.com/');
//     try {
//       /
//       // await page.click(SIGN_UP);
//       // await page.waitForSelector(INPUT_NAME, { timeout: 5000 });
//       // await page.type(INPUT_NAME, getRandomName());
//       // await page.type(INPUT_EMAIL, 'asdasds@ads.com');
//       // await page.select('select[id="SELECTOR_1"]', getRandMonth());
//       // await page.select('select[id="SELECTOR_2"]', getRandInterval(1, 30).toString());
//       // await page.select('select[id="SELECTOR_3"]', '200' + getRandInterval(0, 5));
//       // await page.waitForFunction(
//       //   () => {
//       //     const element = document.querySelector('div[data-testid="ocfSignupNextLink"]');
//       //     return !element || element.getAttribute('aria-disabled') !== 'true';
//       //   },
//       //   { polling: 'raf' }, // Use 'raf' for more responsive polling
//       //   'div[data-testid="ocfSignupNextLink"]',
//       // );
//       // await page.click('[data-testid="ocfSignupNextLink"]');
//       // await page.waitForSelector('div[data-testid="ocfSettingsListNextButton"]', { timeout: 5000 });
//       // await page.click('[data-testid="ocfSettingsListNextButton"]');
//       // await page.waitForSelector('div[data-testid="ocfSignupReviewNextLink"]', { timeout: 5000 });
//       // await page.click('[data-testid="ocfSignupReviewNextLink"]');
//     } catch (error) {
//       console.error(error);
//     }
//   });
