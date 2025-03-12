import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/Home";
import Student from "./Components/Student";
import Category from "./Components/Category";
import Profile from "./Components/Profile";
import AddCategory from "./Components/AddCategory";
import AddStudent from "./Components/AddStudent";
import Start from "./Components/Start";
import StudentLogin from "./Components/StudentLogin";
import EditStudent from "./Components/EditStudent";
import StudentDetail from "./Components/StudentDetail";
import AddProfile from "./Components/AddProfile";
import EditProfile from "./Components/EditProfile";
import Board from "./Components/Board";
import Title from "./Components/Title";
import Supervision from "./Components/Supervision";
import Submission from "./Components/Submission";
import Account from "./Components/Account";
import Task from "./Components/Task";
import AddTitle from "./Components/AddTitle";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/" element={<Board />}></Route>
       <Route path="/start" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/student_login" element={<StudentLogin />}></Route>


        <Route path="/student_detail" element={<StudentDetail />}> 

        <Route index element={<Board />}></Route>
        <Route path="/student_detail/title" element={<Title />}></Route>
        <Route path="/student_detail/supervision" element={<Supervision />}></Route>
        <Route path="/student_detail/submission" element={<Submission />}></Route>
        <Route path="/student_detail/account/" element={<Account />}></Route>
        <Route path="/student_detail/add_title" element={<AddTitle />}></Route>
        </Route>
        


        <Route path="/dashboard" element={<Dashboard />}>
        
          <Route index element={<Home />}></Route>
          <Route path="/dashboard/students" element={<Student />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
          <Route path="/dashboard/edit_student/:id" element={<EditStudent />}></Route>
          <Route path="/dashboard/add_profile" element={<AddProfile />}></Route>
          <Route path="/dashboard/edit_profile/:id" element={<EditProfile />}></Route>
          <Route path="/dashboard/tasks" element={<Task />}></Route>
          
          <Route
            path="/dashboard/add_category"
            element={<AddCategory />}
          ></Route>
          <Route path="/dashboard/add_student" element={<AddStudent />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
