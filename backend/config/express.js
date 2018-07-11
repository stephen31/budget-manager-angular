/**
 * Express JS
 */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import session from 'express-session';
import logger from 'morgan';
import {checkJwtToken, errorHandler} from './middlewares';
import path from 'path';


export default function() {
    const app = express();
    const apiRouter = express.Router();
    const authRouter = express.Router();

    app.use(cookieParser());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    app.use(bodyParser.json());

    // app.use(session({
    //     saveUninitialized: true,
    //     resave: true,
    //     secret: 'secretcookie'
    // }));

    apiRouter.use(checkJwtToken);

    require('../app/user/user.server.routes')(apiRouter);
    require('../app/auth/auth.server.routes')(authRouter);

    app.use('/api', apiRouter);
    app.use('/', authRouter);

    app.use(errorHandler);

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(logger('dev'));

    return app;
}
