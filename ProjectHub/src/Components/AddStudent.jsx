import axios from "axios";
import React, { useEffect, useState } from "react";

const AddStudent = () => {
  const [student, setStudent] = useState({
    name: "",
    email: "",
    password: "",
    registerNo: "",
    address: "",
    category_id: "",
    image: "",
   
    
  });



  const [category, setCategory] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/auth/category")
      .then((result) => {
        if (result.data.Status) {
          setCategory(result.data.Result);
        } else {
          alert(result.data.Error);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3000/auth/add_student', student)
    .then(result => {
      if(result.data.Status) {
          navigate('/dashboard/employee')
      } else {
          alert(result.data.Error)
      }
  })
  .catch(err => console.log(err))
  }





  return (
    <div className='d-flex justify-content-center align-items-center mt-3'>
    <div className='p-3 rounded w-50 border'>
    <h3 className="text-center">Add Student</h3>
        <form className="row g-1" onSubmit={handleSubmit}>
            <div className="col-12">
            <label for="inputName" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputName"
              placeholder="Enter Name"
              onChange={(e) =>
                setStudent({ ...student, name: e.target.value })}
              />
            </div>
            <div className="col-12">
            <label for="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control rounded-0"
              id="inputEmail4"
              placeholder="Enter Email"
              autoComplete="off" 
              onChange={(e) =>
                setStudent({ ...student, email: e.target.value })}
              />
              </div>
              <div className="col-12">
            <label for="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control rounded-0"
              id="inputPassword4"
              placeholder="Enter Password"
              onChange={(e) =>
                setStudent({ ...student, password: e.target.value })}
              />
               <label for="inputId" className="form-label">
              Register No
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputRegisterNo"
              placeholder="Enter Register Number"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, registerNo: e.target.value })}
              />
              </div>
              <div className="col-12">
            <label for="inputAddress" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control rounded-0"
              id="inputAddress"
              placeholder="1234 Main St"
              autoComplete="off"
              onChange={(e) =>
                setStudent({ ...student, address: e.target.value })}
              />
              </div>
               <div className="col-12">
            <label for="category" className="form-label">
            Category
            </label>
            <select name="category" id="category" className="form-select">
            onChange={(e) =>
                setStudent({ ...student, category_id: e.target.value })}
              {category.map((c) => {
                return <option value={c.id}>{c.name}</option>;
              })}
            </select>
              </div>
              <div className="col-12 mb-3">
            <label className="form-label" for="inputGroupFile01">
              Select Image
            </label>
            <input
              type="file"
              className="form-control rounded-0"
              id="inputGroupFile01"
              name="image" 
              onChange={(e) =>
                setStudent({ ...student, image: e.target.files[0]})}
              />
              </div>
              <div className="col-12">
            <button className='btn btn-success w-100 rounded-0 mb-2'>Add Student</button>
            </div>
        </form>
    </div>
</div>
  )
}

export default AddStudent