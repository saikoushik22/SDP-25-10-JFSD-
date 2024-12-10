const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Faculty (Instructor)
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }] // Students enrolled
});

module.exports = mongoose.model("Course", courseSchema);
