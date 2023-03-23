const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://vaibh:9869@cluster0.l21aud2.mongodb.net/?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
  }
);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  console.log("Connected to MongoDB Atlas");
});
