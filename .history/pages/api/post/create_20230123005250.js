export default function handler(req, res) {
  //req.method => GET,POST,DELETE,PATCH,PUT etc.
  if (req.method !== POST) {
    return res.status(400).json({ message: "Invalid Request Type" });
  }
  res.status(200).json({
    name: "Post Create Api",
  });
}
