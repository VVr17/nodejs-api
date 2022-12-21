import express from 'express';
import morgan from 'morgan'; // middleware for logging
import postsRouter from './src/routers/postsRouter.js'; // router with posts
import * as dotenv from 'dotenv'; // to get variables from .env
dotenv.config();

const app = express(); // initialization app

const PORT = process.env.PORT || 8081; // get const from .env config

app.use(express.json()); // parsing JSON
app.use(morgan('tiny')); // morgan logger type

app.use('/api/posts', postsRouter); // add postsRouter to app

app.listen(PORT, err => {
  if (err) console.log('error st server launch', err);
  console.log(`server works at port ${PORT}`);
});
