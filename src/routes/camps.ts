import { Router } from 'express';
import { fetchCamps } from '../controllers/camps';

const router = Router();

router.get('/', fetchCamps);

export default router;
