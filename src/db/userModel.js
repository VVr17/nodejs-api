import bcrypt from 'bcrypt'; // hash password
import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const { Schema, model } = mongoose;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: String,
  lastName: String,
  title: String,
  bio: String,
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

// mongoose middleware --> before save
userSchema.pre('save', async function () {
  //if document is New / user doesn't exist --> hash password
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  //TODO: if user change password
});

export const User = model('User', userSchema);
