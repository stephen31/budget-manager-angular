import Todo from './todo.model';

const createTodo = async (todo) => {
  const createdTodo = await Todo.create({
    ...todo
  }).catch((error) => {
    throw new Error(error);
  });

  await Todo.populate(createdTodo, 'author');
  return createdTodo;
};

const deleteTodo = async (todoId) => {
  const deletedTodo = await Todo.findByIdAndRemove({ _id: todoId }).catch(
    (error) => {
      throw new Error(error);
    }
  );
  await Todo.populate(deletedTodo, 'author');

  return deletedTodo;
};

const getTodo = async (todoId) => {
  const todo = await Todo.findById(todoId).catch((error) => {
    throw new Error(error);
  });
  await Todo.populate(todo, 'author');
  return todo;
};

const getTodos = async (userId) => {
  const todos = await Todo.find({ author: userId }).catch((error) => {
    throw new Error(error);
  });
  await Todo.populate(todos, 'author');
  return todos;
};

const updateTodo = async (todo) => {
  const updatedTodo = await Todo.findByIdAndUpdate(
    { _id: todo.id },
    { ...todo },
    { new: true }
  ).catch((error) => {
    throw new Error(error);
  });
  await Todo.populate(updatedTodo, 'author');
  return updatedTodo;
};

export { createTodo, deleteTodo, updateTodo, getTodo, getTodos };
