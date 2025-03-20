import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectProgress = () => {
  const [milestones, setMilestones] = useState([]);

  // Fetch all milestones
  useEffect(() => {
    axios
      .get('http://localhost:3000/student/milestones')
      .then((result) => {
        if (result.data.Status) {
          setMilestones(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error('Error fetching milestones:', err));
  }, []);

   // Update student progress
   const handleStatusChange = (milestone, newStatus) => {
    axios
      .put(`http://localhost:3000/student/update_progress`,{
        milestone,
        status: newStatus,
      })
      .then((result) => {
        if (result.data.Status) {
          alert('Progress updated successfully');
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error('Error updating progress:', err.response ? err.response.data : err.message);
        alert('Failed to update progress. Check the console for details.');
      });
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
                  onChange={(e) => handleStatusChange(milestone.id, e.target.value)}
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