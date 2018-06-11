import User from './user.model';
import { createError } from 'apollo-errors';
import { encrypt, decrypt, SECRET } from '../../common/utils';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const getUser = async (id) => {
  const user = await User.findById({ _id: id }).catch((error) => {
    throw new Error(error);
  });

  if (!user) {
    throw new Error('Cant find user');
  }
  return user;
};

const createUser = async (newuser) => {
  const userExist = await userNameExist(newuser.username).catch((error) => {
    throw new Error(error);
  });

  if (userExist) {
    throw new Error('Username already exist');
  }

  const isEmailExist = await emailExist(newuser.email).catch((error) => {
    throw new Error(error);
  });

  if (isEmailExist) {
    throw new Error('Email already exist');
  }

  const cryptedPassword = await bcrypt.hash(newuser.password, 10);
  const createdUser = await User.create({
    username: newuser.username,
    email: newuser.email,
    password: cryptedPassword
  }).catch((error) => {
    throw new Error(error);
  });
  createdUser.jwt = jwt.sign({ _id: createdUser._id }, SECRET);

  return createdUser;
};

const login = async (username, password) => {  
  const user = await User.findOne({
    username
  }).catch((error) => {
    throw new Error(error);
  });

  if (!user) {
    throw new Error('User dont exist');
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new Error('Invalid password');
  }

  user.jwt = jwt.sign({ _id: user._id }, SECRET);
  
  return user;
};

const userNameExist = (username) => {
  return User.findOne({
    username
  }).exec();
};

const emailExist = (email) => {
  return User.findOne({
    email
  }).exec();
};

export { getUser, createUser, login };
