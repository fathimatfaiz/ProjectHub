import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";


const EditStudent = () => {
  const {id} = useParams()
  const [student, setStudent] = useState({
    name: "",
    email: "",
    registerno: "",
    address: "",
    category_id: "",
    
  });

  const [categories, setCategories] = useState([]);
  const navigate = useNavigate()


  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth/category`)
      .then((result) => {
        if (result.data.Status) {
          setCategories(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.error("Error fetching categories:", err));

      axios.get('http://localhost:3000/auth/student/'+id)
      .then(result => {
          setStudent({
            ...student,
            name: result.data.Result[0].name,
            email: result.data.Result[0].email,
            address: result.data.Result[0].address,
            registerno: result.data.Result[0].registerno,
            category_id: result.data.Result[0].category_id,
          })
      }).catch((err) => console.error("Error fetching categories:", err));

  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.put('http://localhost:3000/auth/edit_student/'+id, student)
    .then(result => {
      if(result.data.Status) {
        navigate('dashboard/students')

      } else {
        alert(result.data.Error)
      }

    }).catch((err) => console.error("Error fetching categories:", err));
  }


  return (
    <div className="d-flex justify-content-center align-items-center mt-3">
      <div className="p-3 rounded w-50 border">
        <h3 className="text-center">Edit Student</h3>
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

       

          <div className="col-12">
            <button
              type="submit"
              className="btn btn-success w-100 rounded-0 mb-2"
            >
             Edit Student
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditStudent;
