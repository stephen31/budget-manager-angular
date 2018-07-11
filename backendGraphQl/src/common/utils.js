import crypto from 'crypto';
const algorithm = 'aes-256-ctr';

const SECRET = 'secrettest';

function encrypt(password) {
  let cipher = crypto.createCipher(algorithm, SECRET);
  let crypted = cipher.update(password, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(password) {
  let decipher = crypto.createDecipher(algorithm, SECRET);
  var dec = decipher.update(password, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

export { encrypt, decrypt, SECRET };
