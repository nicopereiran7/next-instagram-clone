import mongoose, { Schema, models } from "mongoose";

const FollowSchema = new Schema({
  idUser: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  followed: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default models.Follow || mongoose.model("Follow", FollowSchema);
