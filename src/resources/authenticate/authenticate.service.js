const usersService = require('../users/user.service');
// const bcrypt = require('bcrypt');
// const util = require('util');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { checkHashedPassword } = require('../../utils/hashHelper');

// const comparePass = util.promisify(bcrypt.compare);

// const userPresentFunc = async user => {
//   const userFromDB = await usersService.userPresentFunc(user);
//   if (!userFromDB) return null;
//   const { password: hashedPassword } = userFromDB;
//   const matchPassword = await checkHashedPassword(
//     user.password,
//     hashedPassword
//   );
//   return matchPassword ? userFromDB : null;
// };

const getToken = async user => {
  const userFromDB = await usersService.userPresentFunc(user);
  if (!userFromDB) {
    return null;
  }
  const { password } = user;
  const { password: hashedPassword } = userFromDB;
  const comparisonRes = checkHashedPassword(password, hashedPassword);
  if (comparisonRes) {
    const userId = userFromDB._id;
    const { login } = userFromDB;
    const payload = { userId, login };
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 500 });
  }
};

module.exports = { getToken };
