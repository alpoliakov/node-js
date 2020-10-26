const router = require('express').Router({ mergeParams: true });
const { OK, NO_CONTENT } = require('http-status-codes');
const taskService = require('./task.service');
const Task = require('./task.model');
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');
const { toResponse } = require('./task.model');

router
  .route('/')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const boards = await taskService.getAll(req.params.boardId);
      await res.status(OK).json(boards.map(toResponse));
    })
  )
  .post(
    wrapAsyncFunc(async (req, res) => {
      const task = await taskService.save(
        Task.toResponse({ ...req.body, boardId: req.params.boardId })
      );
      res.status(OK).send(Task.toResponse(task));
    })
  );

router
  .route('/:id')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const board = await taskService.get(req.params.boardId, req.params.id);
      res.status(OK).send(toResponse(board));
    })
  )
  .delete(
    wrapAsyncFunc(async (req, res) => {
      await taskService.remove(req.params.boardId, req.params.id);
      res.sendStatus(NO_CONTENT);
    })
  )
  .put(
    wrapAsyncFunc(async (req, res) => {
      const board = await taskService.update(
        Task.toResponse({
          ...req.body,
          id: req.params.id,
          boardId: req.params.boardId
        })
      );
      res.status(OK).send(toResponse(board));
    })
  );

module.exports = router;
