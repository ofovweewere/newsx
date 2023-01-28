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
    console.log("URL1");
    const datas = new FormData();
    let path = files.image.filepath.replace(/\//g, "%");
    datas.append("file", files.image.filepath);
    datas.append("upload_preset", "upload");
    //console.log(files);
    // const uploadRes = await axios.post(
    //   "https://api.cloudinary.com/v1_1/lamadev/image/upload",
    //   files
    // );
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/dx8ndowtw/image/upload`,
      {
        method: "POST",
        body: datas,
      }
    );
    const data = await uploadRes.json();
    console.log(data);
    //console.log(data.url);

    //const { url } = uploadRes.data;
    //console.log("URL", url);
    if (false) {
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
    console.log(err.message);
    res.status(HttpStatus.BAD_REQUEST).json({
      hasError: true,
      errorMessage: "Something went wrong in create post",
    });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
