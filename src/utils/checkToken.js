const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const PERMITTED_PATHS = process.env.PERMITTED_PATHS;
const util = require('util');
const logger = require('../logger/logger');

const STRATEGY = 'Bearer';
const isTokenValid = util.promisify(jwt.verify);

const checkToken = async (req, res, next) => {
  if (PERMITTED_PATHS.split(',').includes(req.path)) {
    return next();
  }
  const authHeader = req.headers.authorization;
  if (authHeader !== undefined) {
    const [strategy, token] = authHeader.split(' ');
    if (strategy !== STRATEGY) {
      logger.error({ status: 401, message: 'Unauthorized user!' });
      res.status(401).send('Unauthorized user!');
    } else {
      isTokenValid(token, JWT_SECRET_KEY).then(() => {
        console.log('SUCCESS! Token verified!');
      });
      return next();
    }
  }
  logger.error({ status: 401, message: 'Unauthorized user!' });
  res.status(401).send('Unauthorized user!');
};

module.exports = checkToken;
