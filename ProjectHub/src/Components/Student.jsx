import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Student = () => {
  const [student, setStudent] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios.post('http://localhost:3000/mail').then((result) => {
      console.log("hello")
    })
    .catch((err) => console.log(err));


    axios
      .get("http://localhost:3000/auth/student")
      .then((result) => {
        if (result.data.Status) {
          setStudent(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_student/'+id)
    .then(result => {
      if(result.data.Status) {
        window.location.reload()
      } else {
        alert(result.data.Error)
      }
    })

  }



  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Student List</h3>
      </div>
      <Link to="/dashboard/add_student" className="btn btn-success">
        Add Student
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Image</th>
              <th>Email</th>
              <th>Register No</th>
              <th>Address</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {student.map((e) => (
              <tr>
                <td>{e.name}</td>
                <td>
                  <img
                    src={"http://localhost:3000/Images/" + e.image}
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                    }}
                    className="student_image"
                    alt="Student"
                  />
                </td>
                <td>{e.email}</td>
                <td>{e.registerno}</td>
                <td>{e.address}</td>
                <td>
                  <Link
                    to={"/dashboard/edit_student/" + e.id}
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleDelete(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Student;
