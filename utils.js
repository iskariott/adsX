const inquirer = require('inquirer');
const fs = require('fs');

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
  return Math.floor(Math.random() * (max - min) + min);
}

function getRandomName() {
  const syllables1 = ['ra', 'mi', 'zo', 'lu', 'ki', 'po', 'ta', 'je'];
  const syllables2 = ['na', 'ko', 'le', 'ma', 'to', 'ri', 'se', 'la'];
  const randomSyllable1 = syllables1[Math.floor(Math.random() * syllables1.length)];
  const randomSyllable2 = syllables2[Math.floor(Math.random() * syllables2.length)];
  const randomName = randomSyllable1 + randomSyllable2;
  return randomName.charAt(0).toUpperCase() + randomName.slice(1); // Capitalize the first letter
}

async function waitForUser() {
  await inquirer.prompt([
    {
      name: 'Press enter',
      type: 'confirm',
      loop: false,
    },
  ]);
}

function readMails() {
  const data = fs.readFileSync('./gmails.txt', { encoding: 'utf-8' });
  if (!data.length) {
    console.log(`gmails.txt is empty`);
    return false;
  }
  return data.toString().split('\r\n');
}

module.exports = {
  getRandMonth,
  getRandInterval,
  getRandomName,
  readMails,
  waitForUser,
};
