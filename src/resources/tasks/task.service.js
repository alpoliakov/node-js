const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const save = task => tasksRepo.save(task);
const get = (boardId, id) => tasksRepo.get(boardId, id);
const update = task => tasksRepo.update(task);
const remove = (boardId, id) => tasksRepo.remove(boardId, id);
const unsubscribeFromTasks = id => tasksRepo.unsubscribeFromTasks(id);
const removeTasksFromBoard = id => tasksRepo.removeTasksFromBoard(id);

module.exports = {
  getAll,
  save,
  get,
  remove,
  update,
  unsubscribeFromTasks,
  removeTasksFromBoard
};
