import { makeExecutableSchema, addMockFunctionsToSchema } from 'graphql-tools';

import mocks from './mock';
import resolvers from './resolvers';

const typeDefs = `
type Query {
  login(username: String, password: String): User,
  getTodo(id: ID): Todo,
  getTodos(id: ID): [Todo],
  allTodos: [Todo]
}

type Mutation {
  addUser(username: String, email: String, password: String): User,
  addTodo(content: String, author: ID): Todo,
  deleteTodo(id: ID): Todo,
  updateTodo(id: ID, content: String, done: Boolean): Todo
}

type User {
  id: ID!
  username: String
  email: String
  createdAt: String
  jwt: String
  todos: [Todo]
}

type Todo {
  id: ID!
  content: String
  done: Boolean
  createdAt: String
  author: User
}
`;

const schema = makeExecutableSchema({ typeDefs, resolvers });
//addMockFunctionsToSchema({ schema, mocks });
export default schema;
