const express = require("express");
const Course = require("../models/Course");

const router = express.Router();

// Create a new course (For Faculty)
router.post("/", async (req, res) => {
  const { name, description, instructorId } = req.body;
  try {
    const course = new Course({ name, description, instructor: instructorId });
    await course.save();
    res.status(201).json(course);
  } catch (err) {
    res.status(400).json({ message: "Failed to create course", error: err.message });
  }
});

// Get all courses for a specific user
router.get("/:role/:userId", async (req, res) => {
  const { role, userId } = req.params;
  try {
    let courses;
    if (role === "faculty") {
      // Faculty's courses (based on instructorId)
      courses = await Course.find({ instructor: userId });
    } else if (role === "student") {
      // Student's courses (based on students array)
      courses = await Course.find({ students: userId });
    }
    res.status(200).json(courses);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch courses", error: err.message });
  }
});

module.exports = router;
