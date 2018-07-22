import { create, read, categoryById, remove, update, listAllCatecogoriesOfAccount } from "./category.server.controller";


/**
 * 
 * Transactions routes
 */


export default (app) => {
  app.route('/categories')
    .post(create)
    .get(listAllCatecogoriesOfAccount);
  app.route('/categories/:categorieId')
    .get(read)
    .put(update)
    .delete(remove);
  app.param('categorieId', categoryById);
}
