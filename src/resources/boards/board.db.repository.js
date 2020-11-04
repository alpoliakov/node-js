const { Board } = require('./board.model');
const NotFoundError = require('../../errors/notFoundError');

const getAll = async () => Board.find({});

const save = async board => Board.create(board);

const get = async id => {
  const board = await Board.findById(id);
  if (!board) {
    throw new NotFoundError(`Couldn't find a board with this id: ${id}`);
  }
  return board;
};

const update = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return get(id);
};

const remove = async id => {
  const removeResult = await Board.deleteOne({ _id: id });
  if (!removeResult) {
    throw new NotFoundError(`Couldn't find a board with id: ${id}`);
  }
  return removeResult.deletedCount;
};

module.exports = { getAll, save, get, remove, update };
