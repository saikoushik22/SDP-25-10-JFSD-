const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  assignment: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment", required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  file: { type: String, required: true }, // Path to the file submitted by the student
  grade: { type: String, default: "Pending" } // Grade assigned by the faculty
});

module.exports = mongoose.model("Submission", submissionSchema);
