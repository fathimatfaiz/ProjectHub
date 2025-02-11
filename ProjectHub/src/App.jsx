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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/student_login" element={<StudentLogin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="/dashboard/students" element={<Student />}></Route>
          <Route path="/dashboard/category" element={<Category />}></Route>
          <Route path="/dashboard/profile" element={<Profile />}></Route>
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
