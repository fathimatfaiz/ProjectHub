import axios from 'axios'
import React, { useEffect, useState } from 'react'


const Home = () => {
  const [adminTotal, setAdminTotal] = useState()
  const [studentTotal, setStudentTotal] = useState()
  const [categoryTotal, setCategoryTotal] = useState()
  const [admins, setAdmins] = useState([])

  useEffect(() => {
    adminCount();
    StudentCount();
    CategoryCount();
    AdminRecords();

  }, [])

  const AdminRecords = () => {
   axios
      .get("http://localhost:3000/auth/admin_records")
      .then((result) => {
        if (result.data.Status) {
          setAdmins(result.data.Result); // Update state with fetched data
        } else {
          alert(result.data.Error); // Show error message
        }
      })

  }
  const adminCount = () => {
    axios.get('http://localhost:3000/auth/admin_count')
    .then(result => {
      if(result.data.Status) {
        setAdminTotal(result.data.Result[0].admin)

      }
    })
  }

  const StudentCount = () => {
    axios.get('http://localhost:3000/auth/student_count')
    .then(result => {
      if(result.data.Status) {
        setStudentTotal(result.data.Result[0].student)

      }
    })
  }

  const CategoryCount = () => {
    axios.get('http://localhost:3000/auth/category_count')
    .then(result => {
      if(result.data.Status) {
        setCategoryTotal(result.data.Result[0].category)

      }
    })
  }

  return (
   <div>
    <div className='p-3 d-flex justify-content-around mt-3'>
   <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
     <div className='text-center pb-1'>
       <h4>Admin</h4>
     </div>
     <hr />
     <div className='d-flex justify-content-between'>
       <h5>Total:</h5>
       <h5>{adminTotal}</h5>
     </div>
   </div>
   <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
     <div className='text-center pb-1'>
       <h4>Student</h4>
     </div>
     <hr />
     <div className='d-flex justify-content-between'>
       <h5>Total:</h5>
       <h5>{studentTotal}</h5>
     </div>
   </div>
   <div className='px-3 pt-2 pb-3 border shadow-sm w-25'>
     <div className='text-center pb-1'>
       <h4>Category</h4>
     </div>
     <hr />
     <div className='d-flex justify-content-between'>
       <h5>Total:</h5>
       <h5>{categoryTotal}</h5>
     </div>
   </div>
 </div>
 <div className='mt-4 px-5 pt-3'>
    <h3>List of Admins</h3>
    <table className='table'>
      <thead>
        <tr>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          admins.map(a => (
            <tr>
              <td>{a.email}</td>
              <td>
                  <button
                    className="btn btn-info btn-sm me-2"
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-warning btn-sm"       
                  >
                    Delete
                  </button>
                </td>
            </tr>
          ))
        }
      </tbody>
    </table>
 </div>
</div>

 
 
)
}

export default Home