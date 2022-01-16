import { Schema, models, model } from "mongoose";

const PostSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  description: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  type: {
    // mp4, jpeg, png
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
  },
});

export default models.Post || model("Post", PostSchema);
