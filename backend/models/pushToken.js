import mongoose from 'mongoose';

const PushTokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  token: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('PushToken', PushTokenSchema);
