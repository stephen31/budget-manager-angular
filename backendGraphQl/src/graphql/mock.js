import casual from 'casual';

const mocks = {
  String: () => 'It works',
  Query: () => ({
    user: (root, args) => {
      return { userName: args.userName, email: args.email };
    }
  }),
  User: () => ({
    username: () => casual.username,
    email: () => casual.email,
    password: () => casual.password
  }),
  Todo: () => ({
    content: () => casual.sentences(1)
  })
};

export default mocks;
