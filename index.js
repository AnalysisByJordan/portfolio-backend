const serverless = require("serverless-http");
const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config()
const cors = require("cors");

const app = express();
const posts = require("./routes/api/posts");

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: '*'
}));

app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  module.exports.handler = serverless(app);
}
else {
  const port = process.env.PORT || 5000;
  app.listen(port, () => {
    console.log(`Server is listening on port ${port}.`);
  });
}

