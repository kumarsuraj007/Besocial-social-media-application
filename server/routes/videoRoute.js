import express from 'express';
const router = express.Router();
import {uploadVideo} from '../controller/videoController.js';
import { requireLoginAuth } from '../middleware/requireLogin.js';

router.route("/upload").post(requireLoginAuth, uploadVideo)



export default router;