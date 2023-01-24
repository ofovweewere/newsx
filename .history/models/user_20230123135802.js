import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
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
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("User", UserSchema);
