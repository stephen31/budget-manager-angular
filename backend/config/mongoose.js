/**
 * Mongoose db settings
 */

import config from './config';
import mongoose from 'mongoose';
import '../app/user/user.server.model.js';
import '../app/category/category.server.model.js';
import '../app/transaction/transaction.server.model.js';
import '../app/account/account.server.model.js';


mongoose.Promise = global.Promise;

export default function () {
    const db = mongoose.connect(config.db, {useNewUrlParser: true });
    return db;
}
