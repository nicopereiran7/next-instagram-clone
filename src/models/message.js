import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema({
  // idUser send the message
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  idChat: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Chat',
  },
  message: {
    type: String,
    required: true, 
  },
}, {
  timestamps: { createdAt: true, updatedAt: false },
});

export default models.Message || model('Message', MessageSchema);