import { dbConnect } from "@/lib/db-connect";
import Post from "@/models/post";
import { errorHandler, responseHandler, validateAllOnce } from "@/utils/common";
import { getSession } from "next-auth/react";

export default async function handler(req, res) {
  try {
    const session = await getSession({ req });
    if (!session) {
      errorHandler("Access is denied", res);
    } else {
      let { title, desc } = req.body;
      var form = new multiparty.Form();
      form.parse(req, function (err, fields, files) {
        // fields fields fields
        title = fields.title;
        desc = fields.desc;
      });

      console.log("desccc", title);

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
