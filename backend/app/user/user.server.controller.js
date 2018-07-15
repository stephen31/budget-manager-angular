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
export const User = mongoose.model('User');

const usernameExist = (username) => User.findOne({
  username
}).exec();

const emailExist = (email) => User.findOne({
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
  }, (err, user) => {
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
    req.body.password = encryptIv(req.body.password);
    //const user = new User(req.body);

    //const usercreated = await user.save();

    // const tokenData = {
    //     username: usercreated.username,
    //     id: usercreated._id
    // };

    // let responseEmailValidation = await common.sendMailVerificationLink(usercreated, jwt.sign(tokenData, config.key.privateKey));
    // res.status(200).json({success: true, message:'confimation link was sent to your email'});
    const user = new User(req.body);
    await user.save();

    //creation du tokenpayload
    const tokenPayload = {
      username: user.username,
      email: user.email,
      id: user._id,
      xsrfToken: config.xsrfToken
    };

    // creation du token
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

// export const verifyEmail = (req, res, next) => {
//   jwt.verify(req.params.token, config.key.privateKey, (err, decoded) => {
//     if (err) {
//       return next(err);
//     }
//     User.findById(decoded.id, (err, user) => {
//       if (err) return next(err);
//       else if (user === null) {
//         res.status(422).json({
//           message: 'email not recognized'
//         });
//       } else {
//         user.isVerified = true;
//         User.findByIdAndUpdate(decoded.id, user, (err, userUpdated) => {
//           if (err) return next(err);
//           return res.status(200).json({
//             message: 'Email sucessfully verified'
//           });
//         });
//       }
//     });

//   });
// };

// export const resetPassword = (req, res, next) => {
//     Jwt.verify(req.body.token, privateKey, (err, decoded) => {
//         if (err) return next(err);
//         else {
//             User.findUserByIdAndUserName(decoded.id, decoded.username, (err, user) => {
//                 if (err) {
//                     return next(err);
//                 } else if (user === null) {
//                     return res.status(422).json({
//                         message: `Email not recognised`
//                     });
//                 } else if (req.body.newPassword !== req.body.confirmNew) {
//                     return res.status(400).send({
//                         message: `Password Mismatch`
//                     });
//                 } else {
//                     user.password = common.encrypt(req.body.newPassword);
//                     User.updateUser(user, (err, user) => {
//                         if (!err) {
//                             return res.json({
//                                 message: `password changed successfully`
//                             });
//                         } else {
//                             return next(err);
//                         }
//                     });
//                 }
//             });
//         }
//     });
// };

// export const forgotPassword = async(req, res, next) => {
//     try {
//         let user = await User.findOne({
//             email: req.body.email
//         }).exec();
//         if (!user) {
//             return res.status(409).json({
//                 message: 'Email not exist'
//             });
//         }
//         let tokenData = {
//             username: user.username,
//             id: user._id,
//             email: user.email
//         };

//         let msg = await common.sentMailForgotPassword(user, jwt.sign(tokenData, config.key.privateKey));
//         if (msg) {
//             return res.status(200).json({
//                 success: true,
//                 message: 'reset password link sent to your email adress'
//             });
//         }

//     } catch (error) {
//         return next(error);
//     }
// };
