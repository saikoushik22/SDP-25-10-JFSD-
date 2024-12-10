import { useState } from "react";
import { toast } from "react-toastify";
import axios from "../../config/api/axios";
import { useNavigate } from "react-router-dom";

const AssignmentUpload = () => {
  const [assignmentFile, setAssignmentFile] = useState(null);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const navigate = useNavigate();

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setAssignmentFile(file);
    toast.success(`${file.name} added successfully!`);
  };

  const handleDragOver = (e) => e.preventDefault();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAssignmentFile(file);
    toast.success(`${file.name} added successfully!`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!assignmentFile || !scheduleDate || !scheduleTime) {
      toast.error("All fields are required!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", assignmentFile);
      formData.append("scheduleDate", scheduleDate);
      formData.append("scheduleTime", scheduleTime);

      const response = await axios.post("/assignments/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success(response.data.message || "Assignment uploaded successfully!");
      navigate("./..");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to upload assignment.");
    }
  };

  return (
    <main className="assignment-upload">
      <h2 className="m-6 font-spectral mx-auto text-center text-4xl font-bold dark:text-slate-400">
        Upload Assignment
      </h2>
      <form className="w-full max-w-md mx-auto p-4" onSubmit={handleSubmit}>
        {/* Drag-and-Drop Zone */}
        <div
          className="mb-4 flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-400 p-4 text-center dark:border-gray-600"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          {assignmentFile ? (
            <p className="text-green-600">{assignmentFile.name}</p>
          ) : (
            <p className="text-gray-600">
              Drag and drop your assignment here, or{" "}
              <label
                htmlFor="file-upload"
                className="cursor-pointer text-blue-600 hover:underline"
              >
                browse
              </label>
            </p>
          )}
          <input
            id="file-upload"
            type="file"
            accept=".pdf,.doc,.docx,.txt"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>

        {/* Schedule Date */}
        <label htmlFor="schedule-date" className="block font-medium">
          Schedule Date:
        </label>
        <input
          id="schedule-date"
          type="date"
          required
          className="mb-4 w-full rounded-md border border-gray-400 p-2"
          value={scheduleDate}
          onChange={(e) => setScheduleDate(e.target.value)}
        />

        {/* Schedule Time */}
        <label htmlFor="schedule-time" className="block font-medium">
          Schedule Time:
        </label>
        <input
          id="schedule-time"
          type="time"
          required
          className="mb-4 w-full rounded-md border border-gray-400 p-2"
          value={scheduleTime}
          onChange={(e) => setScheduleTime(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700"
        >
          Upload Assignment
        </button>
      </form>
    </main>
  );
};

export default AssignmentUpload;
