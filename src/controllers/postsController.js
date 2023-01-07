import {
  addPost,
  changePostById,
  deletePostById,
  getPostById,
  getPosts,
} from '../services/postsService.js';

const getAllPostsController = async (req, res) => {
  const posts = await getPosts();
  res.json({ posts, status: 'success' });
};

const getPostByIdController = async (req, res) => {
  const { postId } = req.params;
  const post = await getPostById(postId);

  res.json({ post, status: 'success' });
};

const addPostController = async (req, res) => {
  const { topic, text } = req.body;

  await addPost({ topic, text });
  res.json({ status: 'success' });
};

const updatePostController = async (req, res) => {
  const { topic, text } = req.body;
  const { postId } = req.params;

  await changePostById(postId, { topic, text });

  res.json({ status: 'success' });
};

const deletePostController = async (req, res) => {
  const { postId } = req.params;

  await deletePostById(postId);

  res.json({ status: 'success' });
};

export default {
  getAllPostsController,
  getPostByIdController,
  addPostController,
  updatePostController,
  deletePostController,
};
