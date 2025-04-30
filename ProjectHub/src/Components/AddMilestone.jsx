import React, { useState } from "react";
import axios from "axios";

const AddMilestone = () => {
  const [milestone, setMilestone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!milestone.trim()) {
      alert("Milestone name cannot be empty");
      return;
    }

    axios
      .post("http://localhost:3000/student/project_progress", {
        milestone,
        status: "Not Started", // Default status
      })
      .then((result) => {
        if (result.data.Status) {
          alert("Milestone added successfully");
          setMilestone(""); // Clear the input field
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error(
          "Error adding milestone:",
          err.response ? err.response.data : err.message
        );
        alert("Failed to add milestone. Check the console for details.");
      });
  };

  return (
    <div className="container mt-5">
      <h2>Add New Milestone</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="milestone" className="form-label">
            Milestone Name
          </label>
          <input
            type="text"
            className="form-control"
            id="milestone"
            placeholder="Enter milestone name"
            value={milestone}
            onChange={(e) => setMilestone(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Add Milestone
        </button>
      </form>
    </div>
  );
};

export default AddMilestone;
