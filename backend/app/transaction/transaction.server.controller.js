import mongoose from 'mongoose';
import { usernameExist } from '../user/user.server.controller';
const Transaction = mongoose.model('Transaction');
const Account = mongoose.model('Account');


/**
 * Transactions Controller
 */

const accountExist = (id) => Account.findOne({
  _id: id
}).exec();

export const create = async (req, res, next) => {

  if (!req.body.account || !req.body.account.id || !req.body.account.user.username ) {
    return res.status(409).json({
      message: 'Account not present'
    })
  }

  if (!req.body.transaction || !req.body.transaction.name || !req.body.transaction.type || !req.body.transaction.category || !req.body.transaction.value || !req.body.transaction.repeats_type || !req.body.transaction.repeats_number) {
    return res.status(409).json({
      message: 'One field is missing'
    })
  }

  try {
    const user = await usernameExist(req.body.account.user.username);
    if (!user) {
      return res.status(409).json({
        message: 'Unknow user'
      });
    }
    const account = await !accountExist(req.body.account.id)
    if (!account) {
      return res.status(409).json({
        message: 'Unknow account'
      });
    }
    const transaction = new Transaction(req.body.transaction);

    transaction.user = user;
    transaction.account = account;

    transaction.save();
    await Account.update({id: req.body.account.id}, {$push: {transactions: transaction}});
    
  }
  catch(error) {
    next(error);
  }
}

export const list = (req, res, next) => {


};

export const transactionById = (req, res, next, id) => {
  Transaction.findById(id, (err, transaction) => {
    if (err) { return next(err); }
    req.transaction = transaction;
    next();
  })
}