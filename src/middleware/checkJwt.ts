import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export async function validateJWT(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers['authorization'];

  if (!token) {
    res.status(401).send({ message: 'Unauthorised User' });
    return;
  }

  try {
    const reqToken = token.split(' ')[1];
    jwt.verify(reqToken, process.env.JWT_SECRET!);
    next();
  } catch (error) {
    res.status(401).send({ message: 'Unauthorised User' });
  }
}
