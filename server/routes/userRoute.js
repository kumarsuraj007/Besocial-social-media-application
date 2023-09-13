import express from 'express'
const router = express.Router();

import {registerUser, loginUser, updateUser, followUser, unFollowUser, getFriends, getUserConvo, getAllConvo} from '../controller/userController.js'
import {requireLoginAuth} from '../middleware/requireLogin.js'

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/edit/:id').put(requireLoginAuth, updateUser);
router.route('/follow').put(requireLoginAuth, followUser);
router.route('/unfollow').put(requireLoginAuth, unFollowUser);
router.route('/friends/:userId').get(requireLoginAuth, getFriends);
router.route('/conversation/:userId').get(requireLoginAuth, getUserConvo);
router.route('/findallconvo/:firstUserId/:secondUserId').get(requireLoginAuth, getAllConvo);



export default router;
