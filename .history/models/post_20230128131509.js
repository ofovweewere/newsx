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
// mongoose.models = {};
let Modo = mongoose.model("Post", PostSchema);
const MongoModel = mongoose.model("Post") || Modo;
export default MongoModel;
