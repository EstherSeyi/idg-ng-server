import User from '../models/user';

export async function getAUserByEmail(email: string) {
  return User.findOne({ email }).select({
    _id: 0,
    __v: 0,
  });
}
