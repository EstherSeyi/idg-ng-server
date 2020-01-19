import { Router } from 'express';
import { fetchCandidates } from '../controllers/candidates';

const router = Router();

router.post('/', fetchCandidates);

export default router;
