
/**
 * Auth routes
 */

import {login, create} from '../user//user.server.controller';


export default function (app) {
     app.route('/login')
        .post(login);
    app.route('/register')
        .post(create);
    // app.route('/verifyEmail/:token')
    //     .get(user.verifyEmail);
    // app.route('/resetPassword')
    //     .post(user.resetPassword);
    // app.route('/forgotPassword')
    //     .post(user.resetPassword);
 }
