const express = require("express");
const mongoose = require("mongoose");
const app = express();
require("dotenv").config();
var cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const CourseRouter = require("./src/Routes/course");

// // Connect with database
mongoose
  .connect(
    `mongodb+srv://akramulratul:dfBR3CpVGVcV8mDQ@cluster0.kmszq3s.mongodb.net/basiceducation?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database Error ---->", error);
  });
// // Middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use("/", CourseRouter);

// Router Handler

// //404 Handler
app.use((req, res, next) => {
  next("Request URL not found!");
});
app.use((error, req, res, next) => {
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(500).send("There was an Error!");
  }
});
app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}`);
});
