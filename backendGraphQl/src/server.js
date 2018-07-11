import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import { formatError } from 'apollo-errors';
import schema from './graphql/schema';
import mongo from './dbLogic/connectors';
import { getUser } from './common/middlewares';
import cors from 'cors';
const GRAPHQL_PORT = process.env.port || 3000;
const graphQLServer = express();

graphQLServer.use(getUser);

graphQLServer.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress((req, res) => ({
    formatError,
    schema,
    context: {
      user: req.user
    }
  }))
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.listen(GRAPHQL_PORT, () => {
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  );
});
