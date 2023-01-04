import { ObjectId } from 'mongodb';

const getAllPosts = async (req, res) => {
  const { Posts } = req.db;
  const posts = await Posts.find({}).toArray();
  res.json({ posts, status: 'success' });
};

const getPostById = async (req, res) => {
  const { postId } = req.params;
  const { Posts } = req.db;
  const post = await Posts.findOne({
    _id: new ObjectId(postId),
  });

  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id ${postId}` });
  }
  res.json({ post, status: 'success' });
};

const addPost = async (req, res) => {
  const { topic, text } = req.body; // request body data

  const { Posts } = req.db;
  await Posts.insertOne({ topic, text });

  res.json({ status: 'success' });
};

const updatePost = async (req, res) => {
  const { topic, text } = req.body;
  const { postId } = req.params;
  const { Posts } = req.db;

  await Posts.updateOne(
    {
      _id: new ObjectId(postId),
    },
    { $set: { topic, text } }
  );
  res.json({ status: 'success' });
};

const deletePost = async (req, res) => {
  const { postId } = req.params;
  const { Posts } = req.db;

  await Posts.deleteOne({
    _id: new ObjectId(postId),
  });
  res.json({ status: 'success' });
};

export default {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
