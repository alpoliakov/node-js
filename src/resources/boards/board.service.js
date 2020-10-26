const boardsRepo = require('./board.db.repository');

const getAll = () => boardsRepo.getAll();
const get = id => boardsRepo.get(id);
const save = board => boardsRepo.save(board);
const update = (id, board) => boardsRepo.update(id, board);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, get, save, update, remove };
