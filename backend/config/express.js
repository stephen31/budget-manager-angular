/**
 * Express JS
 */

import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
// import session from 'express-session';
import cors from 'cors';
import logger from 'morgan';
import {checkJwtToken, errorHandler, fillAccountAndUserdetails} from './middlewares';
import userRoutes from '../app/user/user.server.routes';
import authRoutes from '../app/auth/auth.server.routes';
import transactionsRoutes from '../app/transaction/transaction.server.routes';
import categoriesRoutes from '../app/category/category.server.routes'
import path from 'path';


export default function() {
    const app = express();

    app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
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
    apiRouter.use(fillAccountAndUserdetails);
    // authRouter.use(checkJwtToken);


    userRoutes(apiRouter);
    transactionsRoutes(apiRouter);
    categoriesRoutes(apiRouter);
    authRoutes(authRouter);

    app.use('/api', apiRouter);
    app.use('/', authRouter);

    app.use(errorHandler);

    app.use(express.static(path.join(__dirname, '/public')));
    app.use(logger('dev'));

    return app;
}
