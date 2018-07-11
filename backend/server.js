
/**
 * SERVER JS
 */

//  process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// import config from './config/config';
// import mongoose from './config/mongoose';
// import express from './config/express';

// const db = mongoose();
// const app = express();

// app.listen(config.port);

// export default app;

console.log(process.env.NODE_ENV + ' server running at http://localhost:'+config.port);
