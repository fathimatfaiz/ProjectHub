import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const Profile = () => {
  const [profile, setProfile] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/profile")
      .then((result) => {
        if (result.data.Status) {
          setProfile(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);


  const handleDelete = (id) => {
    axios.delete('http://localhost:3000/auth/delete_profile/'+id)
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
        <h3>Profile</h3>
      </div>
      <Link to="/dashboard/add_profile" className="btn btn-success">
        My Profile
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
                    {profile.map((e) => (
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
                            className="profile_image"
                            alt="profile"
                          />
                        </td>
                        <td>{e.email}</td>
                        <td>{e.registerno}</td>
                        <td>{e.address}</td>
                        <td>
                          <Link
                            to={"/dashboard/edit_profile/" + e.id}
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

export default Profile;
