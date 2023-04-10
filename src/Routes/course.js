const express = require("express");
const Course = require("../Model/course");

const route = express.Route();
route.post("/courses",async(req,res) => {
    Course

})
module.exports = route;