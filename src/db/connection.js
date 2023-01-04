import * as dotenv from 'dotenv'; // to get variables from .env
import { MongoClient } from 'mongodb';
const collections = {};

dotenv.config();
const client = new MongoClient(process.env.MONGO_URL);

export const getCollections = () => {
  return collections;
};

export const connectMongo = async () => {
  await client.connect();
  console.log('db connected');
  const db = client.db();

  collections.Posts = db.collection('posts');
};
