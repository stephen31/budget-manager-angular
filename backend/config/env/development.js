/**
 * Development Config
 * 
 */

const port = 1337;
const dbUri = 'mongodb://stef:s@ds135574.mlab.com:35574/steflab';
import uid from 'uid-safe';

export default {
    host: 'localhost',
    port,
    db: dbUri,
    key: {
        privateKey: '37LvfsdfsdfXvjYOh9Y',
        tokenExpiry: 60 //1 hour
    },
    xsrfToken: uid.sync(18),
};