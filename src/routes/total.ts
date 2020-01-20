import { Router } from 'express';
import { aggregateData } from '../controllers/total';

const router = Router();

router.get('/', aggregateData);

export default router;
