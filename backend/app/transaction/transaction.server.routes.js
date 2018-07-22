import { create, list, read, transactionById, update, remove } from "./transaction.server.controller";

/**
 * 
 * Transactions routes
 */


export default (app) => {
  app.route('/transactions')
    .post(create)
    .get(list);
  app.route('/transactions/:transactionId')
    .get(read)
    .put(update)
    .delete(remove);
  app.param('transactionId', transactionById);
}
