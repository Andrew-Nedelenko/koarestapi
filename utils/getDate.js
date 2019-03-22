const getDateNow = () => `${new Date().getDate()}.${new Date().getMonth()}.${new Date().getFullYear()} - (${new Date().getHours()}:${new Date().getMinutes()})`;

const CreateCipher = str => Buffer.from(str).toString('base64');
const ReadCipher = (str) => {
  const row = Buffer.from(str, 'base64').toString('ascii');
  let uid = '';
  for (let i = 0; i < row.length; i += 1) {
    if (row[i] === '#') {
      break;
    } else {
      uid += row[i];
    }
  }
  return uid;
};

module.exports = {
  getDateNow, CreateCipher, ReadCipher,
};
