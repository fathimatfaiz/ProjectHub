import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProgressView = () => {
  const [projectProgress, setProjectProgress] = useState([]);

  // Fetch all student progress
  useEffect(() => {
    axios
      .get('http://localhost:3000/auth/project_progress')
      .then((result) => {
        if (result.data.Status) {
          setProjectProgress(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error('Error fetching progress:', err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Progress View</h2>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Student ID</th>
            <th>Milestone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {projectProgress.map((progress) => (
            <tr key={progress.id}>
              <td>{progress.id}</td>
              <td>{progress.milestone}</td>
              <td>{progress.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProgressView;