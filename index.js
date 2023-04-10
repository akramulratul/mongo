const express = require("express");
const mongoose = require("mongoose");
const app = express();
const router = express.Router();
require("dotenv").config();
var cors = require("cors");
const bodyParser = require("body-parser");
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
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());
app.use(cors());

app.use("/", (req, res) => {
  res.send({ name: "hi" });
});

// Router Handler

// //404 Handler
app.use((req, res, next) => {
  next("Request URL not found!");
});
app.use((error, req, res, next) => {
  console.log(error);
  if (error) {
    res.status(500).send(error);
  } else {
    res.status(500).send("There was an Error!");
  }
});
app.listen(5000, () => {
  console.log(`Example app listening on port ${5000}`);
});
