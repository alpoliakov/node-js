const boardsRepo = require('./board.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const save = board => boardsRepo.save(board);
const update = (id, board) => boardsRepo.update(id, board);
const remove = async id => {
  const isRemoved = await boardsRepo.remove(id);
  if (isRemoved) {
    await taskService.removeTasksFromBoard(id);
    return isRemoved;
  }
};

module.exports = { getAll, get, save, update, remove };
