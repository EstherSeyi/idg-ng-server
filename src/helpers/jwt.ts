import jwt from 'jsonwebtoken';
import { INewUser } from '../typings/user';

export function generateAccessToken(user: INewUser) {
  return jwt.sign(user, process.env.JWT_SECRET!, { expiresIn: '7d' });
}
