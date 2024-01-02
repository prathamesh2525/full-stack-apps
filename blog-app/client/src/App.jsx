import "./App.css"
import { Route, Routes } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import AddBlog from "./pages/AddBlog"

function App() {
  return (
    <div className="w-full">
      <Navbar />
      <Routes>
        <Route element={<Home />} exact path="/" />
        <Route element={<AddBlog />} path="/addBlog" />
      </Routes>
    </div>
  )
}

export default App
