import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "./App.css"
import Appbar from "./components/Appbar"
import Signup from "./components/Signup"
import Signin from "./components/Signin"
import Home from "./components/Home"
import Courses from "./components/Courses"
import AddCourse from "./components/AddCourse"
import Course from "./components/Course"

function App() {
  return (
    <div className="min-h-screen flex flex-col justify-center">
      <Router>
        <Appbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<Course />} />
          <Route path="/addcourse" element={<AddCourse />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
