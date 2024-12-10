import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const FacultyAssignment = () => {
  const [assignments, setAssignments] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    dueDate: "",
    questions: "",
    file: null,
  });
  const [loading, setLoading] = useState(false);

  // Load assignments from localStorage on initial load
  useEffect(() => {
    const savedAssignments = JSON.parse(localStorage.getItem("assignments")) || [];
    setAssignments(savedAssignments);
  }, []);

  const handleFileChange = (e) => {
    setFormData({ ...formData, file: e.target.files[0] });
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newAssignment = { ...formData, id: Date.now() };
      const updatedAssignments = [...assignments, newAssignment];
      setAssignments(updatedAssignments);

      // Save the updated assignments list to localStorage
      localStorage.setItem("assignments", JSON.stringify(updatedAssignments));

      toast.success("Assignment uploaded successfully.");
      setFormData({ title: "", dueDate: "", questions: "", file: null });
    } catch (error) {
      toast.error("Error uploading assignment.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Upload New Assignment</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Due Date</label>
          <input
            type="datetime-local"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Questions</label>
          <textarea
            name="questions"
            value={formData.questions}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Upload Assignment File</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Submit Assignment</button>
      </form>

      <h3>Uploaded Assignments</h3>
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
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FacultyAssignment;
