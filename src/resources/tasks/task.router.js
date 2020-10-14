const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const Task = require('./task.model');
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');

router
  .route('/')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const boards = await taskService.getAll(req.params.boardId);
      await res.json(boards);
    })
  )
  .post(
    wrapAsyncFunc(async (req, res) => {
      const task = await taskService.save(
        Task.fromRequest({ ...req.body, boardId: req.params.boardId })
      );
      res.status(200).send(task);
    })
  );

router
  .route('/:id')
  .get(
    wrapAsyncFunc(async (req, res) => {
      const board = await taskService.get(req.params.boardId, req.params.id);
      res.status(200).send(board);
    })
  )
  .delete(
    wrapAsyncFunc(async (req, res) => {
      await taskService.remove(req.params.boardId, req.params.id);
      res.sendStatus(200);
    })
  )
  .put(
    wrapAsyncFunc(async (req, res) => {
      const board = await taskService.update(
        Task.fromRequest({
          ...req.body,
          id: req.params.id,
          boardId: req.params.boardId
        })
      );
      res.status(200).send(board);
    })
  );

module.exports = router;
