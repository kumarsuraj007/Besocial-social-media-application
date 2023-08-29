import express from 'express';
const router = express.Router();
import {createPost, allPost, myPost, likePost, unLikePost, commentPost, deletePost} from '../controller/postController.js';
import { requireLoginAuth } from '../middleware/requireLogin.js';

router.route('/createpost').post(requireLoginAuth, createPost);
router.route('/allpost').get(requireLoginAuth, allPost);
router.route('/mypost').get(requireLoginAuth, myPost);
router.route('/like').put(requireLoginAuth, likePost);
router.route('/unlike').put(requireLoginAuth, unLikePost);
router.route('/comment').put(requireLoginAuth, commentPost);
router.route('/deletepost/:postId').delete(requireLoginAuth, deletePost);

export default router;