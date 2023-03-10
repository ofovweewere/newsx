import Post from "@/models/post";
import { dbConnect } from "@/lib/db-connect";
import { errorHandler, responseHandler, validateAllOnce } from "@/utils/common";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session) {
      errorHandler("Access is denied", res);
    } else {
      const { title, desc } = req.body;
      validateAllOnce({ title, desc });
      if (req.file === undefined) {
        errorHandler("Select image for your news", res);
      }
      // res.status(201).json({ body: req.body, file: req.file });
      await dbConnect();
      const userId = session.user.id;
      const url = staticResourceUrl + req.file.filename;

      const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });

      const post = new Post({
        ...req.body,
        image: url,
        slug: slug.toLocaleLowerCase(),
        user: userId,
      });

      const savePost = await post.save();

      if (savePost) {
        //store cloudinary
        responseHandler(savePost, res);
      } else {
        errorHandler(savePost, res);
      }
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
