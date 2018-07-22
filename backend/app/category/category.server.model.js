import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  iconName: {type: String, required: true, trim: true, default:'defaul_category'},
  user: {type : mongoose.Schema.Types.ObjectId, ref: 'User'},
  transactions: [{type : mongoose.Schema.Types.ObjectId, ref: 'Transaction'}],
  budget: {type: Number}
})

mongoose.model('Category', CategorySchema);