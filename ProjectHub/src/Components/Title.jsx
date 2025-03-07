import React from "react";
import { Link } from "react-router-dom";


const Title = () => {
  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Title Registration</h3>
      </div>
      <Link to="/student_detail/add_title" className="btn btn-success">
        Add Title
      </Link>
      <div className="mt-3"></div>
    </div>
  );
};

export default Title;
