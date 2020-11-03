const bcrypt = require('bcrypt');
const DEFAULT_ROUNDS = 10;

const hashPassword = async password => {
  const salt = await bcrypt.genSalt(DEFAULT_ROUNDS);
  return await bcrypt.hash(password, salt);
};

const checkHashedPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = {
  hashPassword,
  checkHashedPassword
};
