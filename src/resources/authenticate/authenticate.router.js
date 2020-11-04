const router = require('express').Router();
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');
const createError = require('http-errors');
const { BAD_REQUEST } = require('http-status-codes');
const loginService = require('./authenticate.service');
const logger = require('../../logger/logger');

router.route('/').post(
  wrapAsyncFunc(async (req, res) => {
    const { login, password } = req.body;
    if (!login || !password) {
      throw new createError(BAD_REQUEST);
    }
    const token = await loginService.getToken(req.body);
    if (!token) {
      logger.error({
        status: 403,
        message: 'Wrong login/password combination!'
      });
      res.status(403).send('Wrong login/password combination!');
    } else {
      logger.info({ status: 200, message: 'Successful authorization!' });
      res.status(200).json(token);
    }
  })
);

module.exports = router;
