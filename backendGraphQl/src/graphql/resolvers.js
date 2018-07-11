import { createUser, login } from '../dbLogic/user/user.service';
import {
  getTodo,
  getTodos,
  createTodo,
  updateTodo,
  deleteTodo
} from '../dbLogic/todo/todo.service';

const authenticatedCallback = (context, args, callBack) => {
  if (context.user) {
    return callBack(args);
  } else {
    throw new Error('You are not authenticated');
  }
};

const resolvers = {
  Query: {
    login(_, args, context) {
      return login(args.username, args.password);
    },
    getTodo(_, args, context) {
      return authenticatedCallback(context, args.id, getTodo);
    },
    getTodos(_, args, context) {
      return authenticatedCallback(context, args.id, getTodos);
    }
  },
  Mutation: {
    addUser: (_, args) => {
      return createUser(args);
    },
    addTodo: (_, args, context) => {
      return authenticatedCallback(context, args, createTodo);
    },
    deleteTodo: (_, args, context) => {
      return authenticatedCallback(context, args.id, deleteTodo);
    },
    updateTodo: (root, args, context) => {
      return authenticatedCallback(context, args, updateTodo);
    }
  }
};

export default resolvers;
