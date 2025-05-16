import { Router } from 'express';
import deviation from './deviation';
import stats from './stats';
const router = Router();

router.use('/deviation', deviation);
router.use('/stats', stats);

export default router;
