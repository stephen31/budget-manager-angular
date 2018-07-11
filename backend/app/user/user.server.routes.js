
/**
 * User routes
 */

import {list, read, update, remove, userById} from './user.server.controller';
 
export default function(app) {
     app.route('/users')
        //     .post(user.create)
            .get(list);
    app.route('/users/:userId')
            .get(read)
            .put(update)
            .delete(remove);
    app.param('userId', userById);
 }
