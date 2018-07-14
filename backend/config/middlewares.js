/**
 * MiddleWares 
 * 
 */

import config from './config';
import jwt from 'jsonwebtoken';


/**Check jwt token middleware */

export const checkJwtToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (token) {
    jwt.verify(token, config.key.privateKey, (err, decodedPayload) => {
      if (err) {
        return res.status(403).json({
          message: 'Failed to authenticate token'
        });
      }
      if (decodedPayload.xsrfToken !== req.get('x-xsrf-token')) {
        return res.status(403).json({
          message: 'Something goes wrong with the xsrf token'
        });
      }
      req.authenticated_user = decodedPayload;
      next();
    });
  }
}

/*
   Error Middleware
*/

export const errorHandler = (err, req, res) => {
    res.status(500).json(err);
};
