const { stopAdsBySerialNumber, openAdsBySerialNumber } = require('./utils');

async function getTwitterCode(puppeteer) {
  const serial_number = 141;
  const browserWSEndpoint = await openAdsBySerialNumber(serial_number);
  const browser = await puppeteer.connect({
    browserWSEndpoint,
  });
  const page = await browser.newPage();
  try {
    await page.goto('https://mail.proton.me/u/0/inbox');
    console.log('page loaded');
    await new Promise((r) => setTimeout(r, 15000));
    await page.reload();
    let isMsgLoaded = false;
    while (!isMsgLoaded) {
      try {
        await page.waitForSelector('div[style="--index: 0;"', { timeout: 1000 });
        isMsgLoaded = true;
      } catch (e) {
        await new Promise((r) => setTimeout(r, 5000));
        await page.reload();
      }
    }
    const authCode = await page.evaluate(async () => {
      const firstMsg = document.querySelector('div[style="--index: 0;"');
      firstMsg.querySelector('label').click();
      document.querySelector('button[data-testid="toolbar:movetotrash"]').click();
      // const code = firstMsg.getAttribute('data-testid').match(/\d/);
      ////////////////////////////////////////////////////////////////
      // TEST CODE
      const code = 'message-item:075174 - ваш код підтвердження в X'.match(/\d/g);
      ////////////////////////////////////////////////////////////////
      return code;
    });

    await page.close();
    await stopAdsBySerialNumber(serial_number);

    return authCode;
  } catch (error) {
    await stopAdsBySerialNumber(serial_number);
    console.log(error);
  }
}

module.exports = {
  getTwitterCode,
};
