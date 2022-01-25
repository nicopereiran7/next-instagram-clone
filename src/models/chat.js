import { Schema, model, models } from "mongoose";

const ChatSchema = new Schema({
  members: [{
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  }],
  typechat: {
    type: String,
    required: true,
  },
}, {
  timestamps: { createdAt: true, updatedAt: false },
});

export default models.Chat || model("Chat", ChatSchema);