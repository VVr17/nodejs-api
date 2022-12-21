import express from 'express';
import addPostValidation from '../middlewares/validationMiddleware.js';
import postsController from '../controllers/postsController.js';
const {getAllPosts, getPostById, addPost, updatePost, deletePost} =
  postsController;

const router = new express.Router();

router.get('/', getAllPosts);
router.get('/:postId', getPostById);
router.post('/', addPostValidation, addPost);
router.put('/:postId', addPostValidation, updatePost);
router.delete('/:postId', deletePost);

export default router;
