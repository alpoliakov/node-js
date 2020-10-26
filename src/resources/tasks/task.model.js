const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String || null,
    boardId: String,
    columnId: String
  },
  {
    collection: 'tasks'
  }
);

const toResponse = task => {
  const { id, title, order, description, userId, boardId, columnId } = task;
  return { id, title, order, description, userId, boardId, columnId };
};

module.exports = { Task: mongoose.model('tasks', Task), toResponse };

// class Task {
//   constructor({
//     id = uuid(),
//     title = 'Task',
//     order = 0,
//     description = 'task description',
//     userId = null,
//     boardId = null,
//     columnId = null
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
//
//   static fromRequest(body) {
//     return new Task(body);
//   }
// }
