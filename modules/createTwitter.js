const { PASS } = require('../constants.js');
const { getRandomName, getRandMonth, getRandInterval } = require('../utils.js');

async function createTwitter(page, mail) {
  await page.goto('https://twitter.com/');
  await page.waitForSelector('a[data-testid="signupButton"]');
  await page.click('a[data-testid="signupButton"]');
  await page.waitForSelector('input[name="name"]');
  await page.type('input[name="name"]', getRandomName());
  await page.type('input[name="email"]', mail);
  await page.select('select[id="SELECTOR_1"]', getRandMonth());
  await page.select('select[id="SELECTOR_2"]', getRandInterval(1, 30).toString());
  await page.select('select[id="SELECTOR_3"]', '200' + getRandInterval(0, 5));
  await new Promise((r) => setTimeout(r, 1000));
  await page.click('[data-testid="ocfSignupNextLink"]');
  await page.waitForSelector('div[data-testid="ocfSettingsListNextButton"]', { timeout: 5000 });
  await page.click('[data-testid="ocfSettingsListNextButton"]');
  await page.waitForSelector('div[data-testid="ocfSignupReviewNextLink"]', { timeout: 5000 });
  await page.click('[data-testid="ocfSignupReviewNextLink"]');
  await page.waitForSelector('input[name="password"]', { timeout: 300_000 });
  await page.type('input[name="password"]', PASS);
  await new Promise((r) => setTimeout(r, 1000));
  await page.click('[data-testid="LoginForm_Login_Button"]');
  await page.waitForSelector('[data-testid="ocfSelectAvatarSkipForNowButton"]', {
    timeout: 5000,
  });
  await page.click('[data-testid="ocfSelectAvatarSkipForNowButton"]');
  await page.waitForSelector('[data-testid="ocfEnterUsernameSkipButton"]', {
    timeout: 5000,
  });
  await page.click('[data-testid="ocfEnterUsernameSkipButton"]');
  await page.waitForSelector(
    'div[class="css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-1wzrnnt r-19yznuf r-64el8z r-1dye5f7 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"]',
    {
      timeout: 5000,
    },
  );
  await page.click(
    'div[class="css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-1wzrnnt r-19yznuf r-64el8z r-1dye5f7 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"]',
  );
  await page.waitForSelector('div[aria-label="Follow Technology Topic"]', { timeout: 5000 });
  await page.click('div[aria-label="Follow Technology Topic"]');
  await page.click('div[aria-label="Follow Business & finance Topic"]');
  await page.click('div[aria-label="Follow Science Topic"]');

  await page.waitForSelector(
    'div[class="css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1dye5f7 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"]',
    {
      timeout: 5000,
    },
  );
  await page.click(
    'div[class="css-175oi2r r-sdzlij r-1phboty r-rs99b7 r-lrvibr r-19yznuf r-64el8z r-1dye5f7 r-1loqt21 r-o7ynqc r-6416eg r-1ny4l3l"]',
  );
}

module.exports = {
  createTwitter,
};
