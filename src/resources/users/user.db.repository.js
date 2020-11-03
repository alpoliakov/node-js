const { User } = require('./user.model');
const { Not_Found_Error } = require('../../errors/notFoundError');

const getAll = async () => User.find({});

const save = async user => User.create(user);

const get = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw new Not_Found_Error(`Couldn't find a user with id: ${id}`);
  }
  return user;
};

const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return get(id);
};

const remove = async id => {
  const removeResult = await User.deleteOne({ _id: id });
  if (!removeResult) {
    throw new Not_Found_Error(`Couldn't find a user with id: ${id}`);
  }
  return removeResult.deletedCount;
};

const userPresentFunc = async user => {
  const { login } = user;
  return User.findOne({ login });
};

module.exports = { getAll, save, get, remove, update, userPresentFunc };
