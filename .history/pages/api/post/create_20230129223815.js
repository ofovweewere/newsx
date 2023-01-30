import middleware from "@/utils/middleware";
import axios from "axios";
import HttpStatus from "http-status-codes";
import nextConnect from "next-connect";
import { staticResourceUrl } from "@/client/config";
import { dbConnect } from "@/lib/db-connect";
import Post from "@/models/post";
import { errorHandler, responseHandler, validateAllOnce } from "@/utils/common";
import { getSession } from "next-auth/react";
import slugify from "slugify";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;
    const url = req.body.url;
    if (url) {
      const session = await getSession({ req });
      if (!session) {
        errorHandler("Access is denied", res);
      } else {
        const { title, desc } = req.body;
        validateAllOnce({ title, desc });
        // if (url.trim() === "") {
        //   errorHandler("Select image for your news", res);
        // }
        // res.status(201).json({ body: req.body, file: req.file });
        await dbConnect();
        const userId = session.user.id;
        //const url = staticResourceUrl + req.file.filename;

        const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });

        const post = new Post({
          ...req.body,
          image: url,
          slug: slug.toLocaleLowerCase(),
          user: userId,
        });

        const savePost = await post.save();

        if (savePost) {
          await res.revalidate("/");
          responseHandler(savePost, res);
        } else {
          errorHandler(savePost, res);
        }
      }
    } else {
      throw "Something went wrong in create post";
    }

    // do stuff with files and body
    res.status(HttpStatus.OK).json({});
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({
      hasError: true,
      errorMessage: err,
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
