import { dbConnect } from "@/lib/db-connect";
import multer from "multer";
import nc from "next-connect";
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
  .post((req, res) => {
    res.status(201).json({ body: req.body, file: req.file });
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
