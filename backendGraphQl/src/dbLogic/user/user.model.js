import Mongoose from 'mongoose';
Mongoose.Promise = global.Promise;

const UserSchema = Mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const User = Mongoose.model('User', UserSchema);

export default User;
