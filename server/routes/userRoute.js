import express from 'express'
const router = express.Router();

import {registerUser, loginUser, updateUser, followUser, unFollowUser, getFriends} from '../controller/userController.js'
import {requireLoginAuth} from '../middleware/requireLogin.js'

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/edit/:id').put(requireLoginAuth, updateUser);
router.route('/follow').put(requireLoginAuth, followUser);
router.route('/unfollow').put(requireLoginAuth, unFollowUser);
router.route('/friends/:userId').get(requireLoginAuth, getFriends);


export default router;
