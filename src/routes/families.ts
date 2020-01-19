import { Router } from 'express';
import { fetchFamilies } from '../controllers/families';

const router = Router();

router.post('/', fetchFamilies);

export default router;
