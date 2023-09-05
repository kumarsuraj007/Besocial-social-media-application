import express from 'express';
const router = express.Router();
import {addMessage, getMessages} from '../controller/messageController.js';
import { requireLoginAuth } from '../middleware/requireLogin.js';

router.route("/").post(requireLoginAuth, addMessage)
router.route("/:chatId").get(requireLoginAuth, getMessages)


export default router;