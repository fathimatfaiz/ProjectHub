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
import Submission from "./Components/Submission";
import Account from "./Components/Account";
import Task from "./Components/Task";
import AddTitle from "./Components/AddTitle";
import ProjectProgress from "./Components/ProjectProgress";
import EditTitle from "./Components/EditTitle";
import AddMilestone from "./Components/AddMilestone";
import ProgressView from "./Components/ProgressView";
import ProtectedRoute from "./Components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/" element={<Board />}></Route>
        <Route path="/start" element={<Start />}></Route>
        <Route path="/adminlogin" element={<Login />}></Route>
        <Route path="/student_login" element={<StudentLogin />}></Route>

        {/* Student Routes - Protected */}
        <Route
          path="/student_detail"
          element={
            <ProtectedRoute requiredRole="student">
              <StudentDetail />
            </ProtectedRoute>
          }
        >
          <Route index element={<Board />} />
          <Route path="title" element={<Title />} />
          <Route path="project_progress" element={<ProjectProgress />} />
          <Route path="submission" element={<Submission />} />
          <Route path="account" element={<Account />} />
          <Route path="add_title" element={<AddTitle />} />
          <Route path="edit_title/:id" element={<EditTitle />} />
          <Route path="add_milestone" element={<AddMilestone />} />
        </Route>

        {/* Admin Routes - Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute requiredRole="admin">
              <Dashboard />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="students" element={<Student />} />
          <Route path="category" element={<Category />} />
          <Route path="profile" element={<Profile />} />
          <Route path="edit_student/:id" element={<EditStudent />} />
          <Route path="add_profile" element={<AddProfile />} />
          <Route path="edit_profile/:id" element={<EditProfile />} />
          <Route path="tasks" element={<Task />} />
          <Route path="progress" element={<ProgressView />} />
          <Route path="add_category" element={<AddCategory />} />
          <Route path="add_student" element={<AddStudent />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
