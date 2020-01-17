import User from '../models/user';

export async function getAUser(userID: string) {
  return User.findOne({ id: userID }).select({
    _id: 0,
    __v: 0,
    password: 0,
  });
}

export async function getAUserByEmail(email: string) {
  return User.findOne({ email }).select({
    _id: 0,
    __v: 0,
  });
}
