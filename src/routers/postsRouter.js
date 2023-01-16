import express from 'express';
import addPostValidation from '../middlewares/validationMiddleware.js';
import postsController from '../controllers/postsController.js';
import { asyncWrapper } from '../helpers/apiHelpers.js';
import authMiddleware from '../middlewares/authMiddleware.js';
const {
  getAllPostsController,
  getPostByIdController,
  addPostController,
  updatePostController,
  deletePostController,
} = postsController;

const router = new express.Router();

router.use(authMiddleware);

router.get('/', asyncWrapper(getAllPostsController));
router.get('/:postId', asyncWrapper(getPostByIdController));
router.post('/', addPostValidation, asyncWrapper(addPostController));
router.put('/:postId', addPostValidation, asyncWrapper(updatePostController));
router.delete('/:postId', asyncWrapper(deletePostController));

export default router;
