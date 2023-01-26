import { staticResourceUrl } from "@/client/config";
import { dbConnect } from "@/lib/db-connect";
import Post from "@/models/post";
import { errorHandler, responseHandler } from "@/utils/common";
import multer from "multer";
import { getSession } from "next-auth/react";
import nc from "next-connect";
import path from "path";
import slugify from "slugify";
export const config = {
  api: {
    bodyParser: false,
  },
};

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(process.cwd(), "public", "uploads"));
    },
    filename: function (req, file, cb) {
      cb(null, new Date().getTime() + "-" + file.originalname);
    },
  }),
});

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end("Something broke!");
  },
  onNoMatch: (req, res) => {
    res.status(404).end("Page is not found");
  },
})
  .use(upload.single("image"))
  .post(async (req, res) => {
    try {
      const session = await getSession({ req });
      if (!session) {
        errorHandler("Access is denied", res);
      } else {
        // res.status(201).json({ body: req.body, file: req.file });
        await dbConnect();
        const id = session.user.id;
        const url = staticResourceUrl + req.file.filename;
        console.log("here called -1");
        const slug = slugify(req.body.title, { remove: /[*+~.()'"!:@]/g });
        console.log("here called -2");
        const post = new Post({
          ...req.body,
          image: url,
          slug,
          user: userId,
        });
        console.log("here called 0");
        const savePost = await post.save();
        console.log("Here called");
        if (savePost) {
          responseHandler(userDoc, res, 201);
        } else {
          errorHandler("Something went wrong", res);
        }
      }
    } catch (error) {
      errorHandler(error, res);
    }
  });

export default handler;
// export default async function handler(req, res) {
//   //req.method => GET,POST,DELETE,PATCH,PUT etc.
//   if (req.method !== "POST") {
//     return res.status(400).json({ message: "Invalid Request Type" });
//   }

//   //db connect
//   await dbConnect();
//   const { name } = req.body;

//   res.status(200).json({
//     name,
//   });
// }
