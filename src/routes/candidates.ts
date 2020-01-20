import { Router } from 'express';
import { fetchCandidates } from '../controllers/candidates';

const router = Router();

router.get('/', fetchCandidates);

export default router;
