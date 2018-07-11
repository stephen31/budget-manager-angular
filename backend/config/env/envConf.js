/**
 * Development Config
 * 
 */

const port = 1337;
const dbUri = 'mongodb://stef:s@ds135574.mlab.com:35574/steflab';
import uid from 'uid-safe';
const developmentConf = {
    host: 'localhost',
    port,
    db: dbUri,
    key: {
        privateKey: '37LvfsdfsdfXvjYOh9Y',
        tokenExpiry: 60 //1 hour
    },
    xsrfToken: uid.sync(18),
}

// if(process.env.NODE_ENV === 'production') {

// }

export default developmentConf;