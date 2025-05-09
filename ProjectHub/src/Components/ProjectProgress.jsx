import { useEffect, useState } from "react";
import axios from "axios";

const ProjectProgress = () => {
  const [milestones, setMilestones] = useState([]);

  // Fetch all milestones
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [milestonesRes, progressRes] = await Promise.all([
          axios.get("http://localhost:3000/student/milestones"),
          axios.get("http://localhost:3000/student/project_progress"), // student-specific progress
        ]);

        if (!milestonesRes.data.Status || !progressRes.data.Status) {
          alert("Error fetching data");
          return;
        }

        const milestones = milestonesRes.data.Result;
        const progress = progressRes.data.Result;

        // Merge milestones with progress status
        const merged = milestones.map((m) => {
          const prog = progress.find((p) => p.milestone_id === m.id);
          return {
            ...m,
            status: prog ? prog.status : "Not Started",
            progressId: prog ? prog.id : null, // if progress exists
          };
        });

        setMilestones(merged);
      } catch (err) {
        console.error("Error fetching data:", err);
        alert("Failed to fetch milestones or progress");
      }
    };

    fetchData();
  }, []);

  // Update student progress
  const handleStatusChange = (value, newStatus) => {
    const { id, progressId } = value;

    if (progressId) {
      // Update existing progress
      axios
        .put(`http://localhost:3000/student/project_progress/${progressId}`, {
          milestone_id: id,
          status: newStatus,
        })
        .then((result) => {
          if (result.data.Status) {
            setMilestones((prev) =>
              prev.map((milestone) =>
                milestone.id === id
                  ? { ...milestone, status: newStatus }
                  : milestone
              )
            );
            alert("Progress updated successfully");
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => {
          console.error(
            "Error updating progress:",
            err.response ? err.response.data : err.message
          );
          alert("Failed to update progress. Check the console for details.");
        });
    } else {
      // Create new progress entry
      axios
        .post(`http://localhost:3000/student/project_progress`, {
          milestone_id: id,
          status: newStatus,
        })
        .then((result) => {
          if (result.data.Status) {
            setMilestones((prev) =>
              prev.map((milestone) =>
                milestone.id === id
                  ? { ...milestone, status: newStatus }
                  : milestone
              )
            );
            alert("Progress Added successfully");
          } else {
            alert(result.data.Error);
          }
        })
        .catch((err) => {
          console.error(
            "Error adding progress:",
            err.response ? err.response.data : err.message
          );
          alert("Failed to update progress. Check the console for details.");
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2>Project Progress</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Milestone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((milestone) => (
            <tr key={milestone.id}>
              <td>{milestone.milestone}</td>
              <td>
                <select
                  className="form-select"
                  value={milestone.status}
                  onChange={(e) =>
                    handleStatusChange(milestone, e.target.value)
                  }
                >
                  <option value="Not Started">Not Started</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Completed">Completed</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectProgress;
