const User = require('../resources/users/user.model');

const DB = {
  Users: [],
  Boards: [],
  Tasks: []
};

(() => {
  for (let i = 0; i < 3; i++) {
    DB.Users.push(new User());
  }
})();

const getAllEntities = entityName => {
  return DB[entityName].filter(item => item);
};

const getEntity = (entityName, id) => {
  const entities = DB[entityName]
    .filter(item => item)
    .filter(item => item.id === id);
  if (entities.length > 1) {
    console.error(
      `DB data is damaged. Entity: ${entityName}. EntityID: ${id}.`
    );
    throw Error('DB data is wrong!');
  }
  return entities[0];
};

const updateEntity = async (nameEntity, id, entity) => {
  const oldEntity = getEntity(nameEntity, id);
  if (oldEntity) {
    DB[nameEntity][DB[nameEntity].indexOf(oldEntity)] = { id, ...entity };
  }
  return getEntity(nameEntity, id);
};

const removeEntity = (nameEntity, id) => {
  const entity = getEntity(nameEntity, id);
  if (entity) {
    DB[nameEntity] = DB[nameEntity].filter(item => item.id !== entity.id) || [];
  }
  return entity;
};

const saveEntity = (nameEntity, entity) => {
  DB[nameEntity].push(entity);
  return getEntity(nameEntity, entity.id);
};

module.exports = {
  DB,
  getAllEntities,
  getEntity,
  updateEntity,
  saveEntity,
  removeEntity
};
