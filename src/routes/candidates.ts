import { Router } from 'express';
import { fetchCandidates, filterCandidates } from '../controllers/candidates';

const router = Router();

router.get('/', fetchCandidates);
router.get('/filter', filterCandidates);

export default router;
