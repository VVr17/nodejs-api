import { Post } from '../db/postModel.js';
import { WrongRequestError } from '../helpers/errors.js';

export const getPosts = async () => {
  const posts = await Post.find({});
  return posts;
};

export const getPostById = async postId => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new WrongRequestError(`failure, no post with id ${postId}`);
  }

  return post;
};

export const addPost = async ({ topic, text }) => {
  const post = new Post({ topic, text });
  await post.save();
};

export const changePostById = async (postId, { topic, text }) => {
  await Post.findByIdAndUpdate(postId, { $set: { topic, text } });
};

export const deletePostById = async postId => {
  await Post.findByIdAndDelete(postId);
};
