// /**
//  * 
//  * passport config js
//  */


// import passport from 'passport';
// import mongoose from 'mongoose';
// const Client = mongoose.model('Client');

// passport.use('client-basic', new BasicStrategy(
//     (username, password, next) => {
//         Client.findOne({ id: username}, (err, client) => {
//             if(err) {
//                 return next(err);
//             }

//             if(!client) {
//                 return next(null, false, {message : 'Client doesnt exist'});
//             }

//             if(client.secret !== password) {
//                 return next(null, false, {message : 'bad password'});
//             }

//             return next(null, client);
//         });
//     }
// ));

// export default passport.authenticate('client-basic', {session : false});