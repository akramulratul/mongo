const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const router = express.Router();
require("dotenv").config();
var cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const CourseRouter = require("./src/Routes/course");

// //
const PORT = process.env.PORT || 5000;
// // Connect with database
const DB =
  "mongodb+srv://akramulratul:dfBR3CpVGVcV8mDQ@cluster0.kmszq3s.mongodb.net/basiceducation?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.log("Database Error ---->", error);
  });
// // Middleware
app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(morgan("dev"));
app.use(cors());
app.use("/public", express.static(path.join(__dirname, "src/uploads")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "API is okay if you want to check",
    routes: {
      courses: "api/courses",
    },
  });
});
app.use("/api", CourseRouter);
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
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
