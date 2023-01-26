import { Post } from '../db/postModel.js';
import { WrongRequestError } from '../helpers/errors.js';

export const getPosts = async (userId, { skip, limit }) => {
  const posts = await Post.find({ userId })
    .select({ __v: 0 })
    .skip(skip)
    .limit(limit)
    .sort('topic');

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

/** Aggregate
 * const userWithPostsAggregate = await User.aggregate([
    {
      $project: {
        __v: 0,
        password: 0,
      },
    },
    {
      $lookup: {
        from: 'posts',
        localField: '_id',
        foreignField: 'userId',
        as: 'userPosts',
      },
    },
  ]);
 */
