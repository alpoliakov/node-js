const notFoundError = require('./notFoundError');
const logger = require('../logger/logger');
const { INTERNAL_SERVER_ERROR, getStatusText } = require('http-status-codes');

const handlerError = (err, req, res, next) => {
  console.error(err);
  const { body, query, url, method } = req;
  if (err instanceof notFoundError) {
    logger.error({
      status: err.message,
      statusText: err.name,
      method,
      message: JSON.stringify({ url, body, query })
    });
    res.status(err.status).send(err.message);
  } else if (err) {
    logger.error({
      method,
      status: `${INTERNAL_SERVER_ERROR}`,
      message: getStatusText(INTERNAL_SERVER_ERROR)
    });
    res
      .status(INTERNAL_SERVER_ERROR)
      .send(getStatusText(INTERNAL_SERVER_ERROR));
  }
  next();
};

module.exports = handlerError;
