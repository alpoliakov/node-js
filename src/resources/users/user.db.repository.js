const { User } = require('./user.model');
const { Not_Found_Error } = require('../../errors/notFoundError');
// const ITEM_NAME = 'user';

const getAll = async () => User.find({});

const save = async user => User.create(user);

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new Not_Found_Error(`Couldn't find a user with id: ${id}`);
  }
  return user;
};

const remove = async id => User.deleteOne({ _id: id });

const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return get(id);
};

module.exports = { getAll, save, get, remove, update };
