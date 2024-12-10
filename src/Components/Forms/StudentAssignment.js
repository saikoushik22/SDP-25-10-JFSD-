import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const StudentAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [submittedAssignments, setSubmittedAssignments] = useState([]);
  const [formData, setFormData] = useState({
    assignmentId: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  // Load assignments and student submissions from localStorage
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(savedAssignments);
    
    const savedSubmissions = JSON.parse(localStorage.getItem("submissions")) || [];
    setSubmittedAssignments(savedSubmissions);
  }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleSubmit = (e, assignmentId) => {
    e.preventDefault();
    setLoading(true);

    try {
      const newSubmission = {
        assignmentId,
        file: formData.file,
        status: "Pending", // Initial status is Pending
        id: Date.now(),
      };

      // Update the student's submission status
      const updatedSubmissions = [...submittedAssignments, newSubmission];
      setSubmittedAssignments(updatedSubmissions);

      // Save the updated submissions to localStorage
      localStorage.setItem("submissions", JSON.stringify(updatedSubmissions));

      toast.success("Assignment submitted successfully.");
      setFormData({ assignmentId: "", file: null });
    } catch (error) {
      toast.error("Error submitting assignment.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Available Assignments</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {assignments.map((assignment) => (
            <li key={assignment.id}>
              <h4>{assignment.title}</h4>
              <p>{assignment.dueDate}</p>
              <p>{assignment.questions}</p>
              <a
                href={assignment.file ? URL.createObjectURL(assignment.file) : "#"}
                target="_blank"
                rel="noopener noreferrer"
              >
                Download Assignment
              </a>

              <form onSubmit={(e) => handleSubmit(e, assignment.id)}>
                <input
                  type="file"
                  onChange={handleFileChange}
                  required
                />
                <button type="submit">Submit Completed Assignment</button>
              </form>
            </li>
          ))}
        </ul>
      )}

      <h3>Your Submitted Assignments</h3>
      {submittedAssignments.length ? (
        <ul>
          {submittedAssignments.map((submission) => (
            <li key={submission.id}>
              <h4>{`Assignment ${submission.assignmentId}`}</h4>
              <p>Status: {submission.status}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No assignments submitted yet.</p>
      )}
    </div>
  );
};

export default StudentAssignment;
