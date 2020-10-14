const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');

router
  .route('/')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const users = await usersService.getAll();
      await res.json(users.map(User.toResponse));
    })
  )
  .post(
    wrapAsyncFunc(async (req, res) => {
      const user = await usersService.save(User.fromRequest(req.body));
      res.status(200).send(User.toResponse(user));
    })
  );

router
  .route('/:id')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const user = await usersService.get(req.params.id);
      res.status(200).send(User.toResponse(user));
    })
  )
  .put(
    wrapAsyncFunc(async (req, res) => {
      const user = await usersService.update(req.params.id, req.body);
      res.status(200).send(User.toResponse(user));
    })
  )
  .delete(
    wrapAsyncFunc(async (req, res) => {
      await usersService.remove(req.params.id);
      res.sendStatus(204);
    })
  );

module.exports = router;
