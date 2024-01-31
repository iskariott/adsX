const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const { readMails } = require('./utils.js');
const { openAdsBySerialNumber } = require('./modules/ads.js');
const { createTwitter } = require('./modules/createTwitter.js');
const fs = require('fs');

////////////////////////
const ACCOUNT_ID = 30;
////////////////////////

puppeteer.use(StealthPlugin());
async function process() {
  const mails = readMails();
  if (!mails) return;
  //////////////////////////////////////////////
  // fetch list of profiles from ads
  // const { getListOfProfiles} = require('./modules/ads.js');
  // const accList = getListOfProfiles()
  //////////////////////////////////////////////

  //////////////////////////////////////////////
  // get list of profiles from constants.js
  const { accList } = require('./constants.js');
  //////////////////////////////////////////////

  const accsKeys = Object.keys(accList);
  const gmail = mails[ACCOUNT_ID - 21];
  let data = `\nProfile: ${ACCOUNT_ID} # Mail: ${gmail} # Status: `;
  const browserWSEndpoint = await openAdsBySerialNumber(accList[accsKeys[ACCOUNT_ID]]);
  const browser = await puppeteer.connect({
    browserWSEndpoint,
    defaultViewport: null,
  });
  const page = await browser.newPage();
  try {
    await createTwitter(page, gmail);
    data += 'success';
  } catch (e) {
    console.log(e);
    data += 'failed';
  }
  fs.appendFileSync('./results.txt', data);
}
process();
