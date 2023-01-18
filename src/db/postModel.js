import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const { Schema, model } = mongoose;

const postSchema = new Schema({
  topic: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  text: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});

export const Post = model('Post', postSchema);
