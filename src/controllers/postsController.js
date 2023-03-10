import {
  addPost,
  changePostById,
  deletePostById,
  getPostById,
  getPosts,
} from '../services/postsService.js';

const getAllPostsController = async (req, res) => {
  const { _id: userId } = req.user;
  let { skip = 0, limit = 5 } = req.query;

  limit = limit > 10 ? 10 : limit;

  const posts = await getPosts(userId, { skip, limit });
  res.json({ posts, skip, limit, status: 'success' });
};

const getPostByIdController = async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;
  const post = await getPostById(postId, userId);

  res.json({ post, status: 'success' });
};

const addPostController = async (req, res) => {
  const { _id: userId } = req.user;
  const { topic, text } = req.body;

  await addPost({ topic, text }, userId);
  res.json({ status: 'success' });
};

const updatePostController = async (req, res) => {
  const { _id: userId } = req.user;
  const { topic, text } = req.body;
  const { postId } = req.params;

  await changePostById(postId, { topic, text }, userId);

  res.json({ status: 'success' });
};

const deletePostController = async (req, res) => {
  const { _id: userId } = req.user;
  const { postId } = req.params;

  await deletePostById(postId, userId);

  res.json({ status: 'success' });
};

export default {
  getAllPostsController,
  getPostByIdController,
  addPostController,
  updatePostController,
  deletePostController,
};
