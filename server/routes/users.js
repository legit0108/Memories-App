import express from 'express';

import {signin, signup, resetPassword} from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/resetPassword', resetPassword)

export default router;