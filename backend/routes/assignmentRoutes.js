const express = require("express");
const Assignment = require("../models/Assignment");

const router = express.Router();

// Create an assignment
router.post("/", async (req, res) => {
  const { courseId, title, description, dueDate, questions } = req.body;
  try {
    const assignment = new Assignment({ course: courseId, title, description, dueDate, questions });
    await assignment.save();
    res.status(201).json(assignment);
  } catch (err) {
    res.status(400).json({ message: "Failed to create assignment", error: err.message });
  }
});

// Get all assignments for a specific course
router.get("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const assignments = await Assignment.find({ course: courseId });
    res.status(200).json(assignments);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch assignments", error: err.message });
  }
});

module.exports = router;
