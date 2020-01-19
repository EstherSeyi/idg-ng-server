import { compare } from 'bcryptjs';

import { getAUserByEmail } from './user';
import { ILogin } from '../typings/user';

export async function attemptLogin({ email, password }: ILogin) {
  // if input is validated, find user
  const user = await getAUserByEmail(email);

  if (!user) {
    return {
      error: true,
      msg: 'Invalid credentials. Please check your email/password.',
    };
  }

  const passwordExists = await compare(password, user.password);

  if (!passwordExists) {
    return {
      error: true,
      msg: 'Invalid credentials. Please check your email/password.',
    };
  }

  return {
    error: false,
    user,
  };
}
