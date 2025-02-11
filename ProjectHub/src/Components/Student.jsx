import React from "react";
import { Link } from "react-router-dom";

const Student = () => {
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Student List</h3>
      </div>
      <Link to="/dashboard/add_student" className="btn btn-success">
        Add Student
      </Link>
      <div className="mt-3"></div>
    </div>
  )
}

export default Student
