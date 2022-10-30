import express from 'express';

import {signin, signup, resetPassword, forgotPassword} from '../controllers/user.js'

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/resetPassword', resetPassword)
router.post('/forgotPassword', forgotPassword)

export default router;