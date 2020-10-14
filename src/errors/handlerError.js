const notFoundError = require('./notFoundError');
const logger = require('../logger/logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const handlerError = (err, req, res, next) => {
  console.error(err);
  const { body, query, url, method } = req;
  if (err instanceof notFoundError) {
    logger.error({
      status: err.message,
      method,
      statusText: err.name,
      message: JSON.stringify({ url, body, query })
    });
    res.status(err.status).send(err.message);
  } else if (err) {
    logger.error({
      status: `${INTERNAL_SERVER_ERROR}`,
      method,
      message: getStatusText(INTERNAL_SERVER_ERROR),
      description: err.message
    });
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = handlerError;
