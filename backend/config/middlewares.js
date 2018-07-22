/**
 * MiddleWares 
 * 
 */

import config from './config';
import jwt from 'jsonwebtoken';
import { usernameExist } from '../app/user/user.server.controller';
import { accountExist } from '../app/transaction/transaction.server.controller';


/**Check jwt token middleware */

export const checkJwtToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, config.key.privateKey, (err, decodedPayload) => {
      if (err) {
        // console.log(err);
        return res.status(403).json({
          message: 'Failed to authenticate token'
        });
      }
      if (decodedPayload.xsrfToken !== req.get('x-xsrf-token')) {
        return res.status(403).json({
          message: 'Something goes wrong with the xsrf token'
        });
      }
      // console.log(decodedPayload);
      req.authenticated_user = decodedPayload;
      next();
    });
  }
}

export const fillAccountAndUserdetails = async(req, res, next) => {
  try {
    const user = await usernameExist(req.authenticated_user.username);
    if (!user) {
      return res.status(409).json({
        message: 'Unknow user'
      });
    }
    const account = await accountExist(req.authenticated_user.accountId)
    if (!account) {
      return res.status(409).json({
        message: 'Unknow account'
      });
    }
    req.user_details = user;
    req.user_account = account;
    next();
  }catch(error) {
    next(error);
  }
}

/*
   Error Middleware
*/

export const errorHandler = (err, req, res, next) => {
    res.status(500).json(err);
};
