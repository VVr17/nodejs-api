import { Post } from '../db/postModel.js';
import { WrongRequestError } from '../helpers/errors.js';

export const getPosts = async userId => {
  const posts = await Post.find({ userId });
  return posts;
};

export const getPostById = async (postId, userId) => {
  const post = await Post.findById({ _id: postId, userId });

  if (!post) {
    throw new WrongRequestError(`failure, no post with id ${postId}`);
  }

  return post;
};

export const addPost = async ({ topic, text }, userId) => {
  const post = new Post({ topic, text, userId });
  await post.save();
};

export const changePostById = async (postId, { topic, text }, userId) => {
  await Post.findByIdAndUpdate(
    { _id: postId, userId },
    { $set: { topic, text } }
  );
};

export const deletePostById = async (postId, userId) => {
  await Post.findByIdAndDelete({ _id: postId, userId });
};
