const { default: axios } = require('axios');
const { USER_LIST_URL, BROWSER_STOP_URL, BROWSER_START_URL } = require('../constants');

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

async function getListOfProfiles() {
  let accs = {};
  for (let i = 0; ; i++) {
    try {
      const s = await axios
        .get(USER_LIST_URL, { params: { page_size: 100, page: i } })
        .then((r) => r.data.data.list);
      if (!s.length) break;
      const obj = s.map((itm) => ({ [itm.name]: itm.serial_number }));
      const dfd = obj.reduce((result, currentObject) => {
        const [key, value] = Object.entries(currentObject)[0];
        result[key] = value;
        return result;
      }, {});
      accs = { ...accs, ...dfd };
      await new Promise((r) => setTimeout(r, 1000));
    } catch (e) {
      break;
    }
  }
  return accs;
}

module.exports = {
  getListOfProfiles,
  openAdsBySerialNumber,
  stopAdsBySerialNumber,
};
