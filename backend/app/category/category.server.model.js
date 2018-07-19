import mongoose from 'mongoose'

const CategorySchema = new mongoose.Schema({
  name: {type: String, required: true, trim: true},
  icon_name: {type: String, required: true, trim: true, default:'defaul_category'},
  user:  { type : mongoose.Schema.Types.ObjectId, ref : 'User' },
  budget: {type: Number}
})

mongoose.model('Category', CategorySchema);