import jwt from 'jsonwebtoken';
import { SECRET } from './utils';
import User from '../dbLogic/user/user.model';

const getUser = async (req, res, next) => {
  const bearerLength = 'Bearer '.length;
  if (
    req.headers.authorization &&
    req.headers.authorization.length > bearerLength
  ) {
    const token = req.headers.authorization.slice(bearerLength);
    const re = await jwt.verify(token, SECRET, async (err, result) => {
      if (!err) {
        const user = await User.findOne({
          _id: result._id
        });

        if (user) {
          req.user = user;
        }
      }
    });
  }
  next();
};

export { getUser };
