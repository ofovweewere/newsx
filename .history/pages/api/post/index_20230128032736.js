import { dbConnect } from "@/lib/db-connect";
import Post from "@/models/post";
import { errorHandler, responseHandler } from "@/utils/common";

export default async function handler(req, res) {
  try {
    await dbConnect();
    const posts = await Post.find({})
      .select("_id title slug image user createdAt")
      .populate("user", "_id name")
      .exec();
    console.log("post is", posts);
    if (posts) {
      responseHandler(posts, res);
    } else {
      errorHandler("Something went wrong", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}