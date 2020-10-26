const { User } = require('./user.model');
// const { NotFoundError } = require('../../errors/notFoundError');
// const ITEM_NAME = 'user';

const getAll = async () => User.find({});
const save = async user => User.create(user);

module.exports = { getAll, save };
