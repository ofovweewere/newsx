import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      trim: true,
      required: true,
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("User", UserSchema);
