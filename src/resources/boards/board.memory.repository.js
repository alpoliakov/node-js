const DB = require('../../utils/memoryDB');
const ENTITY_NAME = 'Boards';
const Not_Found_Error = require('../../errors/notFoundError');

const getAll = async () => {
  return DB.getAllEntities(ENTITY_NAME);
};

const get = async id => {
  const board = DB.getEntity(ENTITY_NAME, id);
  if (!board) {
    throw new Not_Found_Error(`Couldn't find a board with this id: ${id}`);
  }
  return board;
};

const save = async board => {
  return DB.saveEntity(ENTITY_NAME, board);
};

const remove = async id => {
  if (!(await DB.removeEntity(ENTITY_NAME, id))) {
    throw new Not_Found_Error(`Couldn't find a board with id: ${id}`);
  }
};

const update = async (id, board) => {
  const entity = await DB.updateEntity(ENTITY_NAME, id, board);
  if (!entity) {
    throw new Not_Found_Error(`Couldn't find a user with id: ${id}`);
  }
  return entity;
};

module.exports = { getAll, get, save, remove, update };
