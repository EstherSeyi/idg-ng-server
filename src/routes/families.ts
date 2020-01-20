import { Router } from 'express';
import { fetchFamilies } from '../controllers/families';

const router = Router();

router.get('/', fetchFamilies);

export default router;
