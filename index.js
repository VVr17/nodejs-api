import express from 'express';
import morgan from 'morgan'; // middleware for logging
import * as dotenv from 'dotenv'; // to get variables from .env
import { connectMongo } from './src/db/connection.js';
import authRouter from './src/routers/authRouter.js'; // auth router
import postsRouter from './src/routers/postsRouter.js'; // posts router
import filesRouter from './src/routers/filesRouter.js'; // posts router
import { errorHandler } from './src/helpers/apiHelpers.js';
import http from 'http';
import { Server } from 'socket.io';

dotenv.config();

const app = express(); // initialization app
const PORT = process.env.PORT || 8081; // get const from .env config

// web-socket initialization
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', socket => {
  console.log('new client connected');

  socket.emit('WELCOME_MESSAGE', { message: 'Welcome to chat' }); // for one connected user
  socket.broadcast.emit('WELCOME_MESSAGE', { message: 'New user connected' }); // for everyone connected

  socket.on('CHAT_MESSAGE', ({ message, username }) => {
    io.emit('CHAT_UPDATE', { message, username }); // the same socket.broadcast.emit
  });
});

// to return index.html file
// app.get('/', (req, res, next) => {
//   return res.sendFile(__dirname + '/index.html');
// });

app.use(express.json()); // parsing JSON
app.use(morgan('tiny')); // morgan logger type

app.use('/api/posts', postsRouter); // add postsRouter to app
app.use('/api/auth', authRouter); // add authRouter to app
app.use('/api/files', filesRouter); // add filesRouter to app
app.use(express.static('public')); // to serve static files - index.html

app.use(errorHandler);

const start = async () => {
  try {
    await connectMongo();

    server.listen(PORT, err => {
      if (err) {
        console.log('error st server launch', err);
        process.exit(1);
      }
      console.log(`server works at port ${PORT}`);
    });
  } catch (error) {
    console.error(`Failed to launch application with error ${error.message}`);
  }
};

start();
