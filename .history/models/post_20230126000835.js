import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    title: {
      required: true,
      type: String,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
mongoose.models = {};
export default mongoose.model("Post", PostSchema);
