/**
 * Common function 
 */
import crypto from 'crypto';
import config from './config';
// import nodemailer from 'nodemailer';
// import smtpTransport from 'nodemailer-smtp-transport';
const algorithm = 'aes-256-ctr';
const secret = config.key.privateKey;

// encryp function 

const _encrypt = (password) => {
    const cipher = crypto.createCipher(algorithm, secret);
    let crypted = cipher.update(password, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

const _decrypt = (password) => {
    const decipher = crypto.createDecipher(algorithm, secret);
    let dec = decipher.update(password, 'hex', 'utf8');
    dec += decipher.final('utf8');
    return dec;
}

export const encrypt = (password) =>_encrypt(password);

export const decrypt = (password) => _decrypt(password);

// exports.sendMailVerificationLink = (user, token, callback) => {
//     const link = 'http://' + config.host + ':' + config.port + '/' + config.email.verifyEmailUrl + '/' + token;
//     const from = `StephenLab Server<${config.email.username}>`;
//     const mailbody = `<p>Thanks for Registering</p><p>Please verify your email by clicking on the verification link below.<br/><a href=${link.toString()}
//      >Verification Link</a></p>`;

//     //send mail
//     return mail(from, user.email, `Account Verification`, mailbody);
// };

// exports.sentMailForgotPassword = (user, token, callback) => {
//     const link = "http://" + config.server.host + ":" + config.server.port + "/" + config.email.resetPasswordUrl + "/" + token;
//     const from = `Pyrite Team<${config.email.username}>`;
//     const mailbody = `<p>Please reset your password by clicking on the link below.<br/><a href=${link.toString()}
//     >Reset Password Link</a></p>`
//     return mail(from, user.email, `Account New password`, mailbody);
// };




/** Mailer */

// let transport = nodemailer.createTransport(smtpTransport({
//     service: 'Gmail',
//     auth: {
//         user: config.email.username,
//         pass: config.email.password
//     }
// }));

// function mail(from, email, subject, mailbody) {
//     var mailOptions = {
//         from: from, // sender address
//         to: email, // list of receivers
//         subject: subject, // Subject line
//         //text: result.price, // plaintext body
//         html: mailbody // html body
//     };
//     // console.log('alllooooo', mailOptions);
//     return new Promise((resolve, reject) => {
//         transport.sendMail(mailOptions, function (error, response) {
//             transport.close(); // shut down the connection pool, no more messages
//             if (error) {
//                 return reject(error);
//             } else {
//                 return resolve(response);
//             }
//         });
//     });

// }