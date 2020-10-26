const tasksRepo = require('./task.db.repository');

const getAll = boardId => tasksRepo.getAll(boardId);
const save = task => tasksRepo.save(task);
const get = (boardId, id) => tasksRepo.get(boardId, id);
const remove = (boardId, id) => tasksRepo.remove(boardId, id);
const update = task => tasksRepo.update(task);

module.exports = { getAll, save, get, remove, update };
