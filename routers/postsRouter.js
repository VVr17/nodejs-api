// const express = require('express');
// const Joi = require('joi');
import express, { json } from 'express';
import Joi from 'joi';

const router = express.Router();

let posts = [
  { id: '1', topic: `test1`, text: `test text 1` },
  { id: '2', topic: `test2`, text: `test text 2` },
  { id: '3', topic: `test3`, text: `test text 3` },
];

router.get('/', (_, res) => {
  res.json({ posts, status: 'success' });
});

router.get('/:postId', (req, res) => {
  const { postId } = req.params;
  const post = posts.find(({ id }) => id === postId);

  if (!post) {
    return res
      .status(400)
      .json({ status: `failure, no post with id ${postId}` });
  }

  res.json({ post, status: 'success' });
});

router.post('/', (req, res) => {
  // Joi validation
  const schema = Joi.object({
    topic: Joi.string().alphanum().min(3).max(20).required(),
    text: Joi.string().min(10).max(400).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: error.details[0].message });
  }

  const { topic, text } = req.body; // request body data

  posts.push({
    id: new Date().getTime().toString().slice(5),
    topic,
    text,
  });
  res.json({ status: 'success' });
});

router.put('/:postId', (req, res) => {
  // Joi validation
  const schema = Joi.object({
    topic: Joi.string().alphanum().min(3).max(20).required(),
    text: Joi.string().min(10).max(400).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ status: error.details[0].message });
  }

  const { topic, text } = req.body;
  const { postId } = req.params;

  posts.forEach(post => {
    if (post.id === postId) {
      post.topic = topic;
      post.text = text;
    }
  });
  res.json({ status: 'success' });
});

router.delete('/:postId', (req, res) => {
  const { postId } = req.params;
  posts = posts.filter(({ id }) => id !== postId);
  res.json({ status: 'success' });
});

// module.exports = { postsRouter: router };
export default router;
