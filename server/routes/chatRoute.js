import express from 'express';
const router = express.Router();
import {userChats, findChat, createChat} from '../controller/chatController.js';
import { requireLoginAuth } from '../middleware/requireLogin.js';

router.route("/").post(requireLoginAuth, createChat)
router.route("/:userId").get(requireLoginAuth, userChats)
router.route("/find/:firstId/:secondId").post(requireLoginAuth, findChat)


export default router;