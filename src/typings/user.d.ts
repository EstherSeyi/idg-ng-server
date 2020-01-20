import { Document } from 'mongoose';

export interface INewUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
}

export interface IUserDocument extends Document {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}
