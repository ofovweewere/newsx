import * as mongoose from "mongoose";

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

const MongoModel = mongoose.model("User") || mongoose.model("User", UserSchema);
export default MongoModel;
