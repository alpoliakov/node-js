const DB = require('../../utils/memoryDB');
const ENTITY_NAME = 'Users';
const Not_Found_Error = require('../../errors/notFoundError');

const getAll = async () => {
  return DB.getAllEntities(ENTITY_NAME);
};

const get = async id => {
  const user = DB.getEntity(ENTITY_NAME, id);
  if (!user) {
    throw new Not_Found_Error(`Couldn't find a user with this id: ${id}`);
  }
  return user;
};

const update = async (id, user) => {
  const entity = await DB.updateEntity(ENTITY_NAME, id, user);
  if (!entity) {
    throw new Not_Found_Error(`Couldn't find a user with id: ${id}`);
  }
  return entity;
};

const remove = async id => {
  if (!(await DB.removeEntity(ENTITY_NAME, id))) {
    throw new Not_Found_Error(`Couldn't find a user with id: ${id}`);
  }
};

const save = async user => {
  return DB.saveEntity(ENTITY_NAME, user);
};

module.exports = { getAll, get, update, save, remove };
