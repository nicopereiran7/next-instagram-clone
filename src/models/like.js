import { Schema, model, models } from "mongoose";

const LikeSchema = new Schema({
  idPost: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "Post",
  },
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export default models.Like || model("Like", LikeSchema);