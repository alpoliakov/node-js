const mongoose = require('mongoose');
const uuid = require('uuid');
const Schema = mongoose.Schema;

const columnSchema = new Schema({
  title: String,
  order: Number,
  _id: {
    type: String,
    default: uuid
  },
  versionKey: false
});

const Board = new Schema(
  {
    title: String,
    columns: [columnSchema]
  },
  {
    collection: 'boards'
  }
);

const toResponse = board => {
  const { id, title, columns } = board;
  return { id, title, columns };
};

module.exports = { Board: mongoose.model('boards', Board), toResponse };

// class Board {
//   constructor({
//     id = uuid(),
//     title = 'Autotest board',
//     columns = [{ title: 'Backlog', order: 1 }]
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
//   static fromRequest(body) {
//     return new Board(body);
//   }
// }
