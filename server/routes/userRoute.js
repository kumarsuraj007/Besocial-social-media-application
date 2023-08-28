import express from 'express'
const router = express.Router();

import {registerUser, loginUser} from '../controller/authentication.js'

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

export default router;
