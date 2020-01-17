import { Router, Request, Response } from 'express';
import { attemptLogin } from '../controllers/auth';
import { validateLogin } from '../validation/user';

const router = Router();

router.post('/login', async function(req: Request, res: Response) {
  // validate input
  const { error, value } = validateLogin(req.body);

  if (error) {
    return res.status(400).json({ message: 'input failed validation' });
  }

  const result: any = await attemptLogin(value);

  // case of user email or password mismatch
  if (result.error) {
    return res.status(401).json({ message: 'invalid email/password' });
  }

  // valid case
  const { id, email, name } = result.user;

  // Create a session for current user
  req.session!.user = { id, email, name };

  return res.status(200).json({
    data: { id, email, name },
  });
});

export default router;
