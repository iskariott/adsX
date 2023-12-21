const { default: axios } = require('axios');
const {
  GROUP_INFO_URL,
  USER_LIST_URL,
  BROWSER_START_URL,
  BROWSER_STOP_URL,
} = require('./constants');

function getRandMonth() {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const randomIndex = Math.floor(Math.random() * months.length);
  return months[randomIndex];
}

function getRandInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomName() {
  const syllables1 = ['ra', 'mi', 'zo', 'lu', 'ki', 'po', 'ta', 'je'];
  const syllables2 = ['na', 'ko', 'le', 'ma', 'to', 'ri', 'se', 'la'];
  const randomSyllable1 = syllables1[Math.floor(Math.random() * syllables1.length)];
  const randomSyllable2 = syllables2[Math.floor(Math.random() * syllables2.length)];
  const randomName = randomSyllable1 + randomSyllable2;
  return randomName.charAt(0).toUpperCase() + randomName.slice(1); // Capitalize the first letter
}

async function getAccListByGroup(group_name) {
  const gropData = await axios.get(GROUP_INFO_URL, { params: { group_name: group_name } });
  const group_id = gropData.data.data.list[0].group_id;
  const accListData = await axios.get(USER_LIST_URL, {
    params: {
      group_id,
      page_size: 3,
    },
  });
  return accListData.data.data.list.map((itm) => ({
    name: itm.name,
    id: itm.serial_number,
  }));
}

async function openAdsBySerialNumber(serial_number) {
  try {
    const res = await axios.get(BROWSER_START_URL, {
      params: {
        serial_number,
        headless: 0,
      },
    });
    console.log(`Ads ${serial_number} started: ${res.data.msg}`);
    return res.data.data.ws.puppeteer;
  } catch (error) {
    console.log(error);
  }
}

async function stopAdsBySerialNumber(serial_number) {
  try {
    const res = await axios.get(BROWSER_STOP_URL, {
      params: {
        serial_number,
      },
    });
    console.log(`Ads ${serial_number} stopped: ${res.data.msg}`);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  getRandMonth,
  getRandInterval,
  getRandomName,
  getAccListByGroup,
  openAdsBySerialNumber,
  stopAdsBySerialNumber,
};
