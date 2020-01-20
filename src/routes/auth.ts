import { Router, Request, Response } from 'express';
import { attemptLogin } from '../services/auth';
// import { getAUser } from '../services/user';
import { validateLogin } from '../validation/user';
import { generateAccessToken } from '../helpers/jwt';

const router = Router();

router.post('/login', async function(req: Request, res: Response) {
  // validate input
  const { error, value } = validateLogin(req.body);

  if (error) {
    return res.status(400).json({ message: 'input failed validation' });
  }

  // Checks if email exists and password matches
  const result: any = await attemptLogin(value);

  // case of user email or password mismatch
  if (result.error) {
    return res.status(401).json({ message: 'invalid email/password' });
  }

  // valid case
  const { id, email, name } = result.user;
  const token = generateAccessToken({ id, email, name });

  return res.status(200).json({
    data: { id, email, name, token },
  });
});

// router.post('/me', async function(req, res) {
//   const user = req.session!.user;

//   if (user) {
//     const fetchedUser = await getAUser(user.id);

//     if (!fetchedUser) {
//       return res.status(401).json({ message: 'please login' });
//     }

//     const { id, email, name } = fetchedUser;

//     return res.status(200).json({
//       data: { id, email, name },
//     });
//   }

//   return res.status(401).json({ message: 'please login' });
// });

// router.post('/logout', async function(req, res) {
//   if (req.session) {
//     // delete session object
//     req.session.destroy(err => {
//       if (err) {
//         console.error(err);
//         return;
//       }

//       res.status(200).json({ data: { msg: 'logout successful' } });
//       return;
//     });
//   }
// });

export default router;
