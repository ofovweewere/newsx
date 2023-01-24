import { dbConnect } from "@/lib/db-connect";
import User from "@/models/user";
import { errorHandler, responseHandler, validateAllOnce } from "@/utils/common";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    //return error
    errorHandler("Invalid Request Type", res);
  }
  try {
    const { name, email, password } = req.body;
    validateAllOnce(req.body);

    //create db connection
    await dbConnect();

    const user = new User(req.body);
    const saveUser = await user.save();
    if (savedUser) {
      responseHandler(savedUser, res, 201);
    } else {
      errorHandler("Something went wrong", res);
    }
  } catch (error) {
    errorHandler(error, res);
  }
}
