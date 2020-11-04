const usersService = require('../users/user.service');
const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { checkHashedPassword } = require('../../utils/hashHelper');

const getToken = async user => {
  const userFromDB = await usersService.userPresentFunc(user);
  if (!userFromDB) {
    return null;
  }
  const { password } = user;
  const { password: hashedPassword } = userFromDB;
  const comparisonRes = checkHashedPassword(password, hashedPassword);
  console.log(comparisonRes);
  if (comparisonRes) {
    const userId = userFromDB._id;
    const { login } = userFromDB;
    const payload = { userId, login };
    return jwt.sign(payload, JWT_SECRET_KEY, { expiresIn: 500 });
  }
};

module.exports = { getToken };
