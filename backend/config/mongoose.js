/**
 * Mongoose db settings
 */

import config from './config';
import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

export default function () {
    const db = mongoose.connect(config.db);
    require('../app/user/user.server.model.js');
    require('../app/oauth2/client.server.model.js');
    return db;
};