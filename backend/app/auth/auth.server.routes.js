
/**
 * Auth routes
 */

import user from '../user/user.server.controller';

export default function (app) {
     app.route('/login')
        .post(user.login);
    app.route('/register')
        .post(user.create);
    app.route('/verifyEmail/:token')
        .get(user.verifyEmail);
    app.route('/resetPassword')
        .post(user.resetPassword);
    app.route('/forgotPassword')
        .post(user.resetPassword);
 };