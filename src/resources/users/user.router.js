const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const User = require('./user.model');
const usersService = require('./user.service');
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');
const { toResponse } = require('./user.model');

router
  .route('/')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const users = await usersService.getAll();
      await res.status(OK).json(users.map(toResponse));
    })
  )
  .post(
    wrapAsyncFunc(async (req, res) => {
      const { name, login, password } = req.body;
      const user = await usersService.save(name, login, password);
      res.status(OK).send(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const user = await usersService.get(req.params.id);
      res.status(OK).send(toResponse(user));
    })
  )
  .put(
    wrapAsyncFunc(async (req, res) => {
      const user = await usersService.update(req.params.id, req.body);
      res.status(OK).send(toResponse(user));
    })
  )
  .delete(
    wrapAsyncFunc(async (req, res) => {
      await usersService.remove(req.params.id);
      res.sendStatus(NO_CONTENT);
    })
  );

module.exports = router;
