import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    registerno: "",
    address: "",
    category_id: "",
    image: null, // Ensure null as default for file input
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", student.name);
    formData.append("email", student.email);
    formData.append("password", student.password);
    formData.append("registerno", student.registerno);
    formData.append("address", student.address);
    formData.append("image", student.image);
    formData.append("category_id", student.category_id);

    axios
      .post("http://localhost:3000/auth/add_student", formData)
      .then((result) => {
        if (result.data.Status) {
          navigate("/dashboard/students");
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error adding student:", err));
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Add Student</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
          <div className="col-12">
            <label htmlFor="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              value={student.name}
              onChange={(e) => setStudent({ ...student, name: e.target.value })}
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off"
              value={student.email}
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })
              }
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              value={student.password}
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })
              }
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputRegisterNo" className="form-label">
              Register No
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputRegisterNo"
              placeholder="Enter Register Number"
              autoComplete="off"
              value={student.registerno}
              onChange={(e) =>
                setStudent({ ...student, registerno: e.target.value })
              }
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              value={student.address}
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })
              }
              required
            />
          </div>

          <div className="col-12">
            <label htmlFor="category" className="form-label">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="form-select"
              value={student.category_id}
              onChange={(e) =>
                setStudent({ ...student, category_id: e.target.value })
              }
              required
            >
              <option value="">Select Category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 mb-3">
            <label htmlFor="inputGroupFile01" className="form-label">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image"
              accept="image/*"
              onChange={(e) =>
                setStudent({ ...student, image: e.target.files[0] })
              }
              required
            />
          </div>

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-success w-100 rounded-0 mb-2"
            >
              Add Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddStudent;
