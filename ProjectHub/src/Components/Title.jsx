import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Title = () => {
  const [title, setTitle] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/student/title")
      .then((result) => {
        if (result.data.Status) {
          setTitle(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error fetching titles:", err));
  }, []);

  const handleDelete = (id) => {
    axios
      .delete("http://localhost:3000/student/delete_title/" + id)
      .then((result) => {
        if (result.data.Status) {
          window.location.reload();
        } else {
          alert(result.data.Error);
        }
      });
  };

  return (
    <div className="px-5 mt-3">
      <div className="d-flex justify-content-center">
        <h3>Title Registration</h3>
      </div>
      <Link to="/student_detail/add_title" className="btn btn-success">
        Add Title
      </Link>
      <div className="mt-3">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {title.map((e) => (
              <tr key={e.id}>
                <td>{e.title}</td>
                <td>{e.description}</td>
                <td>
                  <span
                    className={`badge ${
                      e.status === "Approved"
                        ? "bg-success"
                        : e.status === "Rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {e.status}
                  </span>
                </td>
                <td>
                  <Link
                    to={"/student_detail/edit_title/" + e.id}
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

export default Title;