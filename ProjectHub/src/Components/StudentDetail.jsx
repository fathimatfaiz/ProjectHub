import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "bootstrap-icons/font/bootstrap-icons.css";

const StudentDetail = () => {
  return (
    <div className="container-fluid">
    <div className="row flex-nowrap">
      <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
      <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100">
           <Link to="/student_detail"
          className="d-flex align-items-center pb-3 mb-md-1 mt-md-3 me-md-auto text-white text-decoration-none">

          <span className="fs-5 fw-bolder d-none d-sm-inline"> Project Hub</span>
          </Link>
           <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
            id="menu">
               <li className="w-100">
                  <Link to="/student_detail"
                  className="nav-link text-white px-0 align-middle"
                  >
                     <i className="fs-4 bi-mortarboard ms-2"></i>
                     <span className="ms-2 d-none d-sm-inline">Dashboard</span>
                   </Link>
               </li>
               <li className="w-100">
                  <Link to="/student_detail/title"
                   className="nav-link px-0 align-middle text-white"
                   >
                     <i className="fs-4 bi-file-earmark-text ms-2"></i>
                     <span className="ms-2 d-none d-sm-inline">Title</span>
                     </Link>
               </li>
               <li className="w-100">
                  <Link to="/student_detail/supervision"
                  className="nav-link px-0 align-middle text-white"
                  >
                     <i className="fs-4 bi-person-check ms-2"></i>
                     <span className="ms-2 d-none d-sm-inline">Supervision</span>
                     </Link>
               </li>

               <li className="w-100">
                  <Link to="/student_detail/submission"
                  className="nav-link px-0 align-middle text-white"
                  >
                     <i className="fs-4 bi-box-arrow-up ms-2"></i>
                     <span className="ms-2 d-none d-sm-inline">Submission</span>
                     </Link>
               </li>

               <li className="w-100">
                  <Link to="/student_detail/account"
                   className="nav-link px-0 align-middle text-white"
                  >
                    <i className="fs-4 bi-person-circle ms-2"></i>
                    <span className="ms-2 d-none d-sm-inline">Account</span>
                    </Link>
               </li>
               <li className="w-100">
                  <Link 
                  className="nav-link px-0 align-middle text-white"
                  >
                     <i className="fs-4 bi-power ms-2"></i>
                     <span className="ms-2 d-none d-sm-inline">Logout</span>
                     </Link>
               </li>
           </ul>
  </div>
  </div>  
    <div className="col p-0 m-0">
      <div className="p-2 d-flex justify-content-center shadow">
        <h4>Project Hub Horizon Campus-FOIT</h4>
      </div>
      <Outlet />
    </div>   
  </div>
  </div>
  
  )
}

export default StudentDetail



