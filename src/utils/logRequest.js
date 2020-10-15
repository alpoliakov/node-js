const logger = require('../logger/logger');

const logRequest = (req, res, next) => {
  const { body, query, url, method } = req;
  logger.info({
    method,
    message: JSON.stringify({ url, body, query })
  });
  next();
};

module.exports = logRequest;
