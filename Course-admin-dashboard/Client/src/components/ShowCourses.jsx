import axios from "axios"
import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { atom, useRecoilValue, useSetRecoilState } from "recoil"
import { userState } from "./Register"

export const courseState = atom({
  key: "courseState",
  default: [],
})

function ShowCourses() {
  const [courses, setCourses] = useState([])
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate()
  const user = useRecoilValue(userState)

  const setCoursesList = useSetRecoilState(courseState)

  useEffect(() => {
    const getCourses = async () => {
      const res = await axios.get("http://localhost:8080/admin/courses", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      setCourses(res.data.courses)
      setCoursesList([...res.data.courses])
    }
    getCourses()
    console.log(user)
  }, [])

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.clear()
    navigate("/login")
    window.location.reload()
  }

  // Add code to fetch courses from the server
  // and set it in the courses state variable.
  return (
    <div className="relative h-screen p-4 flex flex-col">
      <span>{user}</span>
      <button
        onClick={logout}
        className="absolute top-5 right-5 text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
      >
        Logout
      </button>
      <h1 className="text-3xl">Courses </h1>
      <div className="flex flex-wrap justify-center mt-10">
        {courses.map((c) => (
          <Course key={c._id} course={c} />
        ))}
      </div>
      <Link
        className="absolute bottom-5 left-5 text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
        to={"/about"}
      >
        Create Course
      </Link>
    </div>
  )
}

function Course({ course }) {
  const { title, imageLink, price, _id, published } = course
  const navigate = useNavigate()
  return (
    <button
      onClick={() => {
        navigate(`/courses/${_id}`)
      }}
      className="bg-slate-200 m-4 p-4 flex flex-col space-y-1 rounded hover:scale-105 duration-200 shadow-lg"
    >
      <img className="w-72 h-52 rounded" src={imageLink} alt="Poster Link" />
      <span className="text-xl font-bold">{title}</span>
      <span className="text-md italic">Rs.{price}</span>
      <div className="flex justify-between w-full">
        <span className="px-2 py-1 bg-slate-400 rounded text-white font-bold">
          Click to Edit
        </span>
        <span
          className={
            published
              ? "bg-green-600 text-white px-2 py-1 rounded "
              : "bg-red-600  text-white px-2 py-1 rounded "
          }
        >
          {published ? "Published" : "Not Published"}
        </span>
      </div>
    </button>
  )
}

export default ShowCourses
