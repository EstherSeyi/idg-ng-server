import { Router } from 'express';
import { aggregateData } from '../controllers/aggregate';

const router = Router();

router.get('/', aggregateData);

export default router;
