import express from 'express';
import addPostValidation from '../middlewares/validationMiddleware.js';
import postsController from '../controllers/postsController.js';
import modelsMiddleware from '../middlewares/models.js';
import { asyncWrapper } from '../helpers/apiHelpers.js';
const { getAllPosts, getPostById, addPost, updatePost, deletePost } =
  postsController;

const router = new express.Router();

router.use(modelsMiddleware);

router.get('/', asyncWrapper(getAllPosts));
router.get('/:postId', asyncWrapper(getPostById));
router.post('/', addPostValidation, asyncWrapper(addPost));
router.put('/:postId', addPostValidation, asyncWrapper(updatePost));
router.delete('/:postId', asyncWrapper(deletePost));

export default router;
