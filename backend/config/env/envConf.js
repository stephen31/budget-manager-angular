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
        privateKey: 'b2df428b9929d3ace7c598bbf4e496b2',
        tokenExpiry: '1d'
    },
    xsrfToken: uid.sync(18),
}

// if(process.env.NODE_ENV === 'production') {

// }

export default developmentConf;