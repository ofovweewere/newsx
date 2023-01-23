import { dbConnect } from "@/lib/db-connect";

export default async function handler(req, res) {
  //req.method => GET,POST,DELETE,PATCH,PUT etc.
  if (req.method !== "POST") {
    return res.status(400).json({ message: "Invalid Request Type" });
  }

  //db connect
  await dbConnect;
  const { name } = req.body;

  res.status(200).json({
    name,
  });
}
