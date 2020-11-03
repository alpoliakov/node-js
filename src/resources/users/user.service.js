const usersRepo = require('./user.db.repository');
const taskService = require('../tasks/task.service');
const { User } = require('./user.model');
// const bcrypt = require('bcrypt');
// const util = require('util');
const { hashPassword } = require('../../utils/hashHelper');

// const hashPassword = util.promisify(bcrypt.hash);

const getAll = () => usersRepo.getAll();

const get = id => usersRepo.get(id);

const save = async (name, login, password) => {
  const hash = await hashPassword(password);
  const user = new User({ name, login, password: hash });
  return usersRepo.save(user);
};

const update = async (id, user) => {
  // eslint-disable-next-line require-atomic-updates
  user.password = await hashPassword(user.password, 10);
  return usersRepo.update(id, user);
};

const remove = async id => {
  const isRemoved = await usersRepo.remove(id);
  if (isRemoved) {
    await taskService.unsubscribeFromTasks(id);
    return isRemoved;
  }
};

const userPresentFunc = user => usersRepo.userPresentFunc(user);

module.exports = { getAll, get, save, remove, update, userPresentFunc };
