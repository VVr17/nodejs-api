let posts = [
  { id: '1', topic: `test1`, text: `test text 1` },
  { id: '2', topic: `test2`, text: `test text 2` },
  { id: '3', topic: `test3`, text: `test text 3` },
];

const getAllPosts = (_, res) => {
  res.json({ posts, status: 'success' });
};

const getPostById = (req, res) => {
  const { postId } = req.params;
  const post = posts.find(({ id }) => id === postId);

  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id ${postId}` });
  }

  res.json({ post, status: 'success' });
};

const addPost = (req, res) => {
  const { topic, text } = req.body; // request body data

  posts.push({
    id: new Date().getTime().toString().slice(5),
    topic,
    text,
  });
  res.json({ status: 'success' });
};

const updatePost = (req, res) => {
  const { topic, text } = req.body;
  const { postId } = req.params;

  posts.forEach(post => {
    if (post.id === postId) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({ status: 'success' });
};

const deletePost = (req, res) => {
  const { postId } = req.params;
  posts = posts.filter(({ id }) => id !== postId);
  res.json({ status: 'success' });
};

export default {
  getAllPosts,
  getPostById,
  addPost,
  updatePost,
  deletePost,
};
