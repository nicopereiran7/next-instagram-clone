import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema({
  idPost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post"
  },
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  }
})

export default models.Comment || model("Comment", CommentSchema);