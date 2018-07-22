
/**
 * Transactions Controller
 */

import mongoose from 'mongoose';
const Transaction = mongoose.model('Transaction');
const Account = mongoose.model('Account');
const Category = mongoose.model('Category');

 /**
  * get account if exist
  */
export const accountExist = (id) => Account.findOne({
  _id: id
}).exec();

 /**
  * get transaction name if exist
  */
 export const transactionNameExist = (name) => Transaction.findOne({
  name
}).exec();

/////////////////////////////////////////////////////
/**
 * Create new transaction
 */
export const create = async (req, res, next) => {

  if (!req.body || !req.body.name || !req.body.type || !req.body.category || !req.body.value || !req.body.repeatsType || !req.body.repeatsNumber) {
    return res.status(409).json({
      message: 'One field is missing'
    })
  }

  try {
    const transactionName = await transactionNameExist(req.body.name);
    if(transactionName) {
      return res.status(409).json({
        message: 'Transaction name already exists'
      })
    }
    const category = await Category.findById(req.body.category).exec();
    if(!category) {
      return res.status(409).json({
        message: 'Unknow category'
      })
    }
    
    const transaction = new Transaction(req.body);
    transaction.user = req.user_details;
    transaction.account = req.user_account;
    transaction.category = category;
    
    await transaction.save();
    category.transactions.push(transaction);
    await category.save();
    // await Account.update({id: req.user_account._id}, {$push: {transactions: transaction}});
    req.user_account.transactions.push(transaction);
    await req.user_account.save();

    res.status(201).json({
      message: 'Transaction created successfully',
      transaction: {
        _id: transaction._id,
        name: transaction.name,
        category: transaction.category._id,
        user: transaction.user._id,
        account: transaction.account._id,
        value: transaction.value,
        repeatsType: transaction.repeatsType,
        repeatsNumber: transaction.repeatsNumber,
        date: transaction.date
      }
    })
  }
  catch(error) {
    next(error);
  }
}
/////////////////////////////////////////////////////
/**
  List all Transactions of a user
 */

export const list = async (req, res, next) => {
  try {
    const transactions= await Account.findById(req.user_account._id).populate('transactions').exec();
    if (!transactions) {
      return res.status(404).json({
        message: 'Transactions not found'
      })
    }
    res.status(200).json({
      message: 'Transactions retrieved successfully',
      transactions: transactions.transactions
    })
  } catch (error) {
    next(error);
  }
};
/////////////////////////////////////////////////////
/**
  Read 
 */
export const read = async (req, res, next) => {
  try {
    const transaction = await Transaction.findById(req.transaction._id)
    .populate('user', '_id username email')
    .populate('category')
    .populate('account', '_id').exec();

    if(!transaction) {
      return res.status(404).json({
        message: 'Transaction Not found'
      })
    }

    if(transaction.user._id.toString() !== req.authenticated_user.id.toString() || transaction.account._id.toString() !== req.authenticated_user.accountId.toString()) {
      return res.status(401).json({
        message: 'Not Authorized'
      })
    }
    res.status(200).json({
      message: 'Transaction retrieved successfully',
      transaction
    });
  }
  catch(error) {
    return next(error);
  }
}
/////////////////////////////////////////////////////
/**
 * remove Transaction
 */

export const remove = async (req, res, next) => {
  try {
    if (req.authenticated_user.id.toString() !== req.transaction.user._id.toString()) {
      return res.status(409).json({
        message: 'Not Authorized'
      })
    }
    
    const deletedTransaction = await Transaction.findByIdAndRemove(req.transaction._id).exec();

    req.user_account.transactions.remove(req.transaction);
    await req.user_account.save();

    req.category.transactions.remove(req.transaction);
    await req.category.save();
    
    res.status(200).json({
      message: 'Transaction deleted successfully',
      category: deletedTransaction
    });
  } catch (error) {
    next(error);
  }
}
////////////////////////////////////////////////////////////////////
/**
 * update Transaction
 */

export const update = async (req, res, next) => {
  try {
    if (req.authenticated_user.id.toString() !== req.transaction.user._id.toString()) {
      return res.status(401).json({
        message: 'Not Authorized'
      })
    }
    const updatedTransaction= await Transaction.findOneAndUpdate({
      _id: req.transaction._id
    }, req.body, {
      new: true
    }).exec();

    if (!updatedTransaction) {
      return res.status(409).json({
        message: 'Error during transaction update'
      })
    }
    req.transaction = updatedTransaction;
    res.status(200).json({
      message: 'Transaction updated successfully',
      transaction: updatedTransaction
    });
  } catch (error) {
    next(error);
  }
}

////////////////////
/**
  preload transaction
 */
export const transactionById = async (req, res, next, id) => {
  try {
    const transaction = await Transaction.findById(id).exec();
    if (!transaction) {
      return res.status(404).json({
        message: 'Transaction not found'
      })
    }
    req.transaction = transaction;
    next();
  } catch (error) {
    next(error);
  }
}
