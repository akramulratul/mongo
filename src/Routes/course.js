const express = require("express");

const { addCourse, getCourse, deleteCourse } = require("../Controller/Course");

const router = express.Router();


//Router
router.post("/courses", addCourse)
router.get("/courses", getCourse)
router.delete("/courses/:id", deleteCourse)



module.exports = router;