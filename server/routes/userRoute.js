import express from 'express'
const router = express.Router();

import {registerUser, loginUser, updateUser} from '../controller/authentication.js'
import {requireLoginAuth} from '../middleware/requireLogin.js'

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/edit/:id').put(requireLoginAuth, updateUser);

export default router;
