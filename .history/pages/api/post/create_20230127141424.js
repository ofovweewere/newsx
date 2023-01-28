import middleware from "@/utils/middleware";
import axios from "axios";
import HttpStatus from "http-status-codes";
import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;

    const uploadRes = await axios.post(
      "https://api.cloudinary.com/v1_1/lamadev/image/upload",
      files
    );

    const { url } = uploadRes.data;
    if (url) {
    } else {
      throw "Something went wrong in create post";
    }

    // do stuff with files and body
    res.status(HttpStatus.OK).json({});
  } catch (err) {
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
