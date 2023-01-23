global.mongoose = {
  conn: null,
  promise: null,
};

async function dbConnect() {
  if (global.mongoose && global.mongoose.conn) {
    return global.mongoose.conn;
  } else {
    const conString = `mongodb+srv://${user}:${password}@cluster0.jhy7jjx.mongodb.net/${database}?retryWrites=true&w=majority`;
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;
    const promise = mongoose.connect(conString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true,
    });
  }
}
