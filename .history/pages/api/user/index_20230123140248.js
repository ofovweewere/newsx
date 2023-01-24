import { dbConnect } from "@/lib/db-connect";
import { errorHandler } from "@/utils/common";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    //return error
    errorHandler("Invalid Request Type", res);
  }
  try {
    await dbConnect();
  } catch (error) {
    errorHandler(error, res);
  }
}
