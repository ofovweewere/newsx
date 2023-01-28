import middleware from "@/utils/middleware";
import HttpStatus from "http-status-codes";

import nextConnect from "next-connect";

const handler = nextConnect();

handler.use(middleware);

handler.post(async (req, res) => {
  try {
    const files = req.files;
    const body = req.body;

    // do stuff with files and body
    res.status(HttpStatus.OK).json({});
  } catch (err) {
    res.status(HttpStatus.BAD_REQUEST).json({ error: err.message });
  }
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default handler;
