/**
 * User controller 
 */

import mongoose from 'mongoose';
import {
  encryptIv,
  decryptIv
} from '../../config/common';
// import boom from 'Boom';
import jwt from 'jsonwebtoken';
import config from '../../config/config';
const User = mongoose.model('User');
const Account = mongoose.model('Account');
const Category = mongoose.model('Category');

export const usernameExist = (username) => User.findOne({
  username
}).exec();

export const emailExist = (email) => User.findOne({
  email
}).exec();

export const login = (req, res) => {

  if (!req.body || !req.body.username || !req.body.password) {
    return res.status(409).json({
      message: 'One field is missing'
    })
  }

  User.findOne({
    username: req.body.username
  }).populate('account').exec((err, user) => {
    if (err || (!user)) {
      return res.status(409).json({
        message: 'Invalid Username'
      });
    }
    if (!user.isVerified) {
      return res.status(409).json({
        message: 'Your account is not verified'
      });
    }
    if (req.body.password === decryptIv(user.password)) {
      //creation du tokenpayload
      const tokenPayload = {
        username: user.username,
        email: user.email,
        id: user._id,
        accountId: user.account._id,
        xsrfToken: config.xsrfToken
      };

      // creation du token
      const token = jwt.sign(tokenPayload, config.key.privateKey, {
        expiresIn: config.key.tokenExpiry
      });
      res.cookie('access_token', token);
      res.status(200).json({
        message: 'You have successfully logged in',
        data: {
          id: user._id,
          name: user.name,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
          xsrfToken: config.xsrfToken
        }
      });
    } else {
      return res.status(422).json({
        message: 'Invalid password'
      });
    }

  });
};

export const create = async (req, res, next) => {

  /**
   * Checking presence of username and email in the db
   */
  if (!req.body || !req.body.username || !req.body.name || !req.body.password || !req.body.confirmPassword || !req.body.email) {
    return res.status(409).json({
      message: 'One field is missing'
    })
  }

  try {
    if (await usernameExist(req.body.username)) {
      return res.status(409).json({
        message: 'Username already exist'
      });
    }

    if (await emailExist(req.body.email)) {
      return res.status(409).json({
        message: 'Email already exist'
      });
    }
    // Create account
    const account = new Account();

    // Create Default categories 
    const groceries_cat = new Category({
        name: 'Groceries',
        budget: 1000,
        iconName: 'groceries_icon'
    });

    await groceries_cat.save();

    const rent_cat = new Category({
        name: 'Rent',
        budget: 1000,
        iconName: 'rent_icon'
    });
    await rent_cat.save();

    const shopping_cat = new Category({
        name: 'Shopping',
        budget: 300,
        iconName: 'shopping_icon'
    });
    await shopping_cat.save();

    const entertainment_cat = new Category({
        name: 'Entertainment',
        budget: 300,
        iconName: 'entertainment_icon'
    })
    await entertainment_cat.save();

    const other_cat = new Category({
        name: 'Others',
        budget: 200,
        iconName: 'others_icon'
    })
    await other_cat.save();

    const bills_cat = new Category({
        name: 'Bills',
        budget: 1000,
        iconName: 'bills_icon',
    })
    await bills_cat.save();

    account.categories.push(groceries_cat, rent_cat, shopping_cat, entertainment_cat, other_cat, bills_cat);

    await account.save();

    //create user
    req.body.password = encryptIv(req.body.password);
    const user = new User(req.body);
    user.account = account;
    await user.save();

    //create tokenpayload
    const tokenPayload = {
      username: user.username,
      email: user.email,
      id: user._id,
      xsrfToken: config.xsrfToken,
      accountId: account._id
    };

    // create token
    const token = jwt.sign(tokenPayload, config.key.privateKey, {
      expiresIn: config.key.tokenExpiry
    });
    res.cookie('access_token', token);
    res.status(200).json({
      message: 'Account created successufully',
      data: {
        id: user._id,
        name: user.name,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
        xsrfToken: config.xsrfToken
      }
    });
  } catch (error) {
    next(error)
  }

};

export const update = (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, req.body, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json(user);
  });
};

export const remove = (req, res, next) => {
  req.user.remove((err) => {
    if (err) {
      return next(err);
    }
    res.json({
      message: 'user deleted',
      user: req.user
    });
  });
};

export const list = (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) {
      return next(err);
    }
    res.json(users);
  });
};

export const read = (req, res) => {
  res.json(req.user);
};

export const userById = (req, res, next, id) => {
  User.findById({
      _id: id
    },
    (err, user) => {
      if (err) {
        return next(err);
      }
      req.user = user;
      next();
    });
};

