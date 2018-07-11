// /**
//  * Application Client controller
//  * 
//  */


// let Client = require('mongoose').model('Client');


// exports.postClients = function (req, res, next) {
//     let client = new Client();
//     // Set the client properties that came from the POST data
//     client.name = req.body.name;
//     client.id = req.body.id;
//     client.secret = req.body.secret;

//     client.save((err, clientcreated) => {
//         if (err) {
//             return next(err);
//         } else {
//             res.json(clientcreated);
//         }
//     });
// };

// // Create endpoint /api/clients for GET
// exports.getClients = function(req, res) {
//     // Use the Client model to find all clients
//     Client.find({}, function(err, clients) {
//       if (err)
//         res.send(err);
  
//       res.json(clients);
//     });
//   };
