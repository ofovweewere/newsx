import { dbConnect } from "@/lib/db-connect";
import Post from "@/models/post";
import User from "@/models/user";
import { errorHandler, responseHandler } from "@/utils/common";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const posts = await Post.find({})
      .select("_id title slug image user createdAt")
      .populate("user", "_id name", User)
      .exec();

    if (posts) {
      responseHandler(posts, res);
    } else {
      errorHandler("Something went wrong", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
