import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  categories: [{type : mongoose.Schema.Types.ObjectId, ref: 'Category'}],
  transactions: [{type : mongoose.Schema.Types.ObjectId, ref: 'Transaction'}]
});

mongoose.model('Account', AccountSchema);


