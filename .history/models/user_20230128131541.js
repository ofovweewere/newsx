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
let Modo = mongoose.model("User", UserSchema);
const MongoModel = mongoose.model("User") || Modo;
export default MongoModel;
