import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  type: {type: String, enum: ['IN', 'OUT']},
  category: {type : mongoose.Schema.Types.ObjectId, ref: 'Category'},
  user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  account: {type : mongoose.Schema.Types.ObjectId, ref: 'Account'},
  value: {type : Number, required: true},
  repeats_type: {type: String, enum: ['DAILY', 'MONTHLY', 'HEBDO']},
  repeats_number: {type: Number},
  date: {type: Date, required: true}
});

TransactionSchema.index({name: 1, user: 1}, {unique: true})
mongoose.model('Transaction', TransactionSchema);
