import { Router } from 'express';
import { dailyQuote } from '../controllers/DailyQuote.controllers.js';

const router = Router();

router.route('/daily-quote').get(dailyQuote);

export default router;