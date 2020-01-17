import Joi from '@hapi/joi';
import { ILogin } from '../typings/user';

const email = Joi.string()
  .email()
  .max(254)
  .lowercase()
  .trim()
  .required();

const password = Joi.string()
  .min(6)
  .max(100)
  .required();

const JoiLoginSchema = Joi.object().keys({
  email,
  password,
});

export function validateLogin(payload: ILogin) {
  const { error, value } = JoiLoginSchema.validate(payload, {
    abortEarly: false,
    allowUnknown: true,
  });

  return { error, value };
}
