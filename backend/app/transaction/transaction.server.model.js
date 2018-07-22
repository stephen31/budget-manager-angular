import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true, unique: true},
  type: {type: String, enum: ['IN', 'OUT']},
  category: {type : mongoose.Schema.Types.ObjectId, ref: 'Category'},
  user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  account: {type : mongoose.Schema.Types.ObjectId, ref: 'Account'},
  value: {type : Number, required: true},
  repeatsType: {type: String, enum: ['DAILY', 'MONTHLY', 'HEBDO']},
  repeatsNumber: {type: Number},
  date: {type: Date, required: false}
});

// TransactionSchema.index({name: 1, user: 1}, {unique: true})
mongoose.model('Transaction', TransactionSchema);
