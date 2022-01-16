import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  siteWeb: {
    type: String,
  },
  description: {
    type: String,
  },
  avatar: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export default models.User || mongoose.model("User", UserSchema);
