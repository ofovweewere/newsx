import mongoose from "mongoose";
global.mongoose = {
  conn: null,
  promise: null,
};

export async function dbConnect() {
  console.log("here called");
  if (global.mongoose && global.mongoose.conn) {
    console.log("Using Existing mongoose connection");
    return global.mongoose.conn;
  } else {
    console.log("Creating new mongoose connection");
    const user = process.env.MONGODB_USER;
    const password = process.env.MONGODB_PASSWORD;
    const database = process.env.MONGODB_DATABASE;
    const conString = `mongodb+srv://${user}:${password}@cluster0.jhy7jjx.mongodb.net/${database}?retryWrites=true&w=majority`;

    const promise = mongoose
      .connect(conString, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true,
      })
      .then((mongoose) => mongoose);

    global.mongoose = {
      conn: await promise,
      promise,
    };

    return await promise;
  }
}
