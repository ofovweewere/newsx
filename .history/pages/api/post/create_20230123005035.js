export default function handler(req, res) {
  //req.method => GET,POST,DELETE,PATCH,PUT etc.
  if (req.method !== POST)
    res.status(200).json({
      name: "Post Create Api",
    });
}
