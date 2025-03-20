import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Task = () => {
  const [milestones, setMilestones] = useState([]);
  const [newMilestone, setNewMilestone] = useState('');

  // Fetch all milestones
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/milestones')
      .then((result) => {
        if (result.data.Status) {
          setMilestones(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error('Error fetching milestones:', err));
  }, []);

   // Upload a new milestone
   const handleUploadMilestone = () => {
    if (!newMilestone.trim()) {
      alert('Milestone name cannot be empty');
      return;
    }

    axios
      .post('http://localhost:3000/auth/upload_milestone', {
        milestone: newMilestone,
      })
      .then((result) => {
        if (result.data.Status) {
          setNewMilestone(''); // Clear the input field
          alert('Milestone uploaded successfully');
          // Refresh the milestones list
          axios
            .get('http://localhost:3000/auth/milestones')
            .then((result) => {
              if (result.data.Status) {
                setMilestones(result.data.Result);
              }
            });
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => {
        console.error('Error uploading milestone:', err.response ? err.response.data : err.message);
        alert('Failed to upload milestone. Check the console for details.');
      });
  };



  return (
    <div className="container mt-5">
      <h2>Admin Dashboard</h2>

      {/* Upload Milestone Form */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter new milestone"
          value={newMilestone}
          onChange={(e) => setNewMilestone(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={handleUploadMilestone}>
          Upload Milestone
        </button>
      </div>

      {/* Milestones Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Milestone</th>
          </tr>
        </thead>
        <tbody>
          {milestones.map((milestone) => (
            <tr key={milestone.id}>
              <td>{milestone.milestone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Task