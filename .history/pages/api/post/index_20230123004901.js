export default function handler(req, res) {
  //req.method => GET,POST,DELETE,PATCH,PUT etc.
  res.status(200).json([{ id: 1, name: "Sachin", email: "sachin@gmail.com" }]);
}