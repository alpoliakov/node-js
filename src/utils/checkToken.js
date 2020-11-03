const jwt = require('jsonwebtoken');
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const PERMITTED_PATHS = process.env.PERMITTED_PATHS;
const util = require('util');

const STRATEGY = 'Bearer';
const isTokenValid = util.promisify(jwt.verify);

const checkToken = async (req, res, next) => {
  const whiteListPath = PERMITTED_PATHS.split(',');
  if (whiteListPath.includes(req.path)) return next();
  const authHeader = req.headers.authorization;
  if (authHeader !== undefined) {
    const tokenString = authHeader.split(' ');
    const [strategy, token] = tokenString;
    if (strategy !== STRATEGY) {
      res.status(401).send('Unauthorized user!');
    } else {
      // eslint-disable-next-line no-shadow
      isTokenValid(token, JWT_SECRET_KEY);
      console.log('SUCCESS! Token verified!!!');
      return next();
    }
  }
  res.status(401).send('Unauthorized user!');
};

module.exports = checkToken;
