const router = require('express').Router();
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');
const createError = require('http-errors');
const { BAD_REQUEST } = require('http-status-codes');
const loginService = require('./authenticate.service');

router.route('*').post(
  wrapAsyncFunc(async (req, res, next) => {
    const { login, password } = req.body;
    if (!login || !password) {
      throw new createError(BAD_REQUEST);
    }
    const token = await loginService.getToken(req.body);
    if (!token) {
      res.status(403).send('Wrong login/password combination!');
    } else {
      res.status(200).json(token);
      return next();
    }
  })
);

module.exports = router;
