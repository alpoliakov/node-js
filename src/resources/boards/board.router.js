const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const wrapAsyncFunc = require('../../utils/wrapAsyncFunc');

router.route('/').get(
  wrapAsyncFunc(async (req, res) => {
    const boards = await boardsService.getAll();
    await res.json(boards);
  })
);

router.route('/:id').get(
  wrapAsyncFunc(async (req, res) => {
    const board = await boardsService.get(req.params.id);
    res.status(200).send(board);
  })
);

router.route('/:id').put(
  wrapAsyncFunc(async (req, res) => {
    const board = await boardsService.update(req.params.id, req.body);
    res.status(200).send(board);
  })
);

router.route('/').post(
  wrapAsyncFunc(async (req, res) => {
    const board = await boardsService.save(Board.fromRequest(req.body));
    res.status(200).send(board);
  })
);

router.route('/:id').delete(
  wrapAsyncFunc(async (req, res) => {
    await boardsService.remove(req.params.id);
    res.sendStatus(200);
  })
);

module.exports = router;
