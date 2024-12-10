const express = require("express");
const Submission = require("../models/Submission");

const router = express.Router();

// Submit an assignment
router.post("/", async (req, res) => {
  const { assignmentId, studentId, filePath } = req.body;
  try {
    const submission = new Submission({ assignment: assignmentId, student: studentId, file: filePath });
    await submission.save();
    res.status(201).json(submission);
  } catch (err) {
    res.status(400).json({ message: "Failed to submit assignment", error: err.message });
  }
});

// Get all submissions for a specific assignment (for faculty to grade)
router.get("/:assignmentId", async (req, res) => {
  const { assignmentId } = req.params;
  try {
    const submissions = await Submission.find({ assignment: assignmentId });
    res.status(200).json(submissions);
  } catch (err) {
    res.status(400).json({ message: "Failed to fetch submissions", error: err.message });
  }
});

module.exports = router;
