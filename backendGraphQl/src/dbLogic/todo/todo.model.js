import Mongoose from 'mongoose';

Mongoose.Promise = global.Promise;

const TodoSchema = Mongoose.Schema({
  content: { type: String, required: true },
  done: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  author: { type: Mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

const Todo = Mongoose.model('Todo', TodoSchema);

export default Todo;
