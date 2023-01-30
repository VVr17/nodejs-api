import mongoose from 'mongoose';
mongoose.set('strictQuery', true);
const { Schema, model } = mongoose;

const verificationSchema = new Schema({
  code: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Users',
  },
  active: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Verification = model('Verification', verificationSchema);
