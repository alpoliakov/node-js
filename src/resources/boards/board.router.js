const router = require('express').Router();
const { OK, NO_CONTENT } = require('http-status-codes');
const Board = require('./board.model');
const boardsService = require('./board.service');
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');
const { toResponse } = require('./board.model');

router
  .route('/')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const boards = await boardsService.getAll();
      await res.status(OK).json(boards.map(toResponse));
    })
  )
  .post(
    wrapAsyncFunc(async (req, res) => {
      const board = await boardsService.save(req.body);
      res.status(OK).send(Board.toResponse(board));
    })
  );

router
  .route('/:id')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const board = await boardsService.get(req.params.id);
      res.status(OK).send(toResponse(board));
    })
  )
  .put(
    wrapAsyncFunc(async (req, res) => {
      const board = await boardsService.update(req.params.id, req.body);
      res.status(OK).send(toResponse(board));
    })
  )
  .delete(
    wrapAsyncFunc(async (req, res) => {
      await boardsService.remove(req.params.id);
      res.sendStatus(NO_CONTENT);
    })
  );

module.exports = router;
