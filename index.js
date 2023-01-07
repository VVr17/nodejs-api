import express from 'express';
import morgan from 'morgan'; // middleware for logging
import postsRouter from './src/routers/postsRouter.js'; // router with posts
import * as dotenv from 'dotenv'; // to get variables from .env
import { connectMongo } from './src/db/connection.js';
import { errorHandler } from './src/helpers/apiHelpers.js';

dotenv.config();

const app = express(); // initialization app
const PORT = process.env.PORT || 8081; // get const from .env config

app.use(express.json()); // parsing JSON
app.use(morgan('tiny')); // morgan logger type

app.use('/api/posts', postsRouter); // add postsRouter to app

app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    app.listen(PORT, err => {
      if (err) console.log('error st server launch', err);
      console.log(`server works at port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error ${error.message}`);
  }
};

start();
