/**
 * Common function 
 */
import {createCipher, createCipheriv, createDecipher, createDecipheriv, randomBytes} from 'crypto';
import config from './config';
// import nodemailer from 'nodemailer';
// import smtpTransport from 'nodemailer-smtp-transport';
const algorithm = 'aes-256-ctr';
// encryp function 


const key = process.env.KEY || config.key.privateKey;
const inputEncoding = 'utf8';
const outputEncoding = 'hex';

/**
 * Encrypt function using only the key.
 * @param {string} value to encrypt
 */
const _encrypt = value => {
    const cipher = createCipher(algorithm, key);
    let crypted = cipher.update(value, inputEncoding, outputEncoding);
    crypted += cipher.final(outputEncoding);
    return crypted;
}

/**
 * Decrypt function using only the key
 * @param {string} value to decrypt
 */
const _decrypt = value => {
    const decipher = createDecipher(algorithm, key);
    let dec = decipher.update(value, outputEncoding, inputEncoding);
    dec += decipher.final(inputEncoding);
    return dec;
}

/**
 * Encrypt using an initialisation vector
 * @param {string} value to encrypt
 */
const _encryptIv = value => {
    const iv = new Buffer(randomBytes(16));
    const cipher = createCipheriv(algorithm, key, iv);
    let crypted = cipher.update(value, inputEncoding, outputEncoding);
    crypted += cipher.final(outputEncoding);
    return `${iv.toString('hex')}:${crypted.toString()}`;
}

/**
 * Decrypt using an initialisation vector
 * @param {string} value value to decrypt
 */
const _decryptIv  = value => {
    const textParts = value.split(':');

    //extract the IV from the first half of the value
    const IV = new Buffer(textParts.shift(), outputEncoding);

    //extract the encrypted text without the IV
    const encryptedText = new Buffer(textParts.join(':'), outputEncoding);

    //decipher the string
    const decipher = createDecipheriv(algorithm,key, IV);
    let decrypted = decipher.update(encryptedText,  outputEncoding, inputEncoding);
    decrypted += decipher.final(inputEncoding);
    return decrypted.toString();
}
export const encrypt = (value) =>_encrypt(value);
export const decrypt = (value) => _decrypt(value);
export const encryptIv = (value) =>_encryptIv(value);
export const decryptIv = (value) => _decryptIv(value);
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