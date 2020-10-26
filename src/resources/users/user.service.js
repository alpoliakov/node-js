const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const save = user => usersRepo.save(user);

const update = (id, user) => usersRepo.update(id, user);

const remove = async id => {
  const isRemoved = await usersRepo.remove(id);
  if (isRemoved) {
    await taskService.unsubscribeFromTasks(id);
    return isRemoved;
  }
};

module.exports = { getAll, get, save, remove, update };
