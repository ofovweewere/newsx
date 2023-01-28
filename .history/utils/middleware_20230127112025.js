import nextConnect from "next-connect";
import multipartFormParser from "./multipart-form-parser";
export const config = {
  api: {
    bodyParser: false,
  },
};
const middleware = nextConnect();

middleware.use(multipartFormParser);

export default middleware;
