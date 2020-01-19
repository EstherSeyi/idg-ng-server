import { Router } from 'express';
import { aggregateData } from '../controllers/total';

const router = Router();

router.post('/', aggregateData);

export default router;
