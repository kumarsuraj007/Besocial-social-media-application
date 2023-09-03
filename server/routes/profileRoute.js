import express from 'express';
const router = express.Router();
import {userProfile} from '../controller/profileController.js';
import {requireLoginAuth} from '../middleware/requireLogin.js'


router.route('/user/:id').get(requireLoginAuth, userProfile);

export default router