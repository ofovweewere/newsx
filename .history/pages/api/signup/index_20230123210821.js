import { dbConnect } from "@/lib/db-connect";
import User from "@/models/user";
import { errorHandler, responseHandler, validateAllOnce } from "@/utils/common";
import bcrypt from "bcrypt";
export default async function handler(req, res) {
  console.log("here called api");
  if (req.method !== "POST") {
    //return error
    errorHandler("Invalid Request Type", res);
  } else {
    try {
      const { name, email, password } = req.body;
      validateAllOnce(req.body);

      //create db connection
      await dbConnect();
      const hashPassword = await bcrypt.hash(password, 8);
      const user = new User({ ...req.body, password: hashPassword });

      const saveUser = await user.save();

      if (saveUser) {
        const userDoc = saveUser._doc;
        delete userDoc.password;
        responseHandler(userDoc, res, 201);
      } else {
        errorHandler("Something went wrong", res);
      }
    } catch (error) {
      errorHandler(error, res);
    }
  }
}
