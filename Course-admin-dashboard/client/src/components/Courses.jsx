import axios from "axios"
import { useEffect, useState } from "react"
import CourseCard from "./CourseCard"
import { Button } from "@mui/material"
import { useNavigate } from "react-router-dom"

const Courses = () => {
  const [courses, setCourses] = useState(null)
  const navigate = useNavigate()

  const getCourses = async () => {
    const response = await axios.get("http://localhost:8080/admin/courses", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setCourses(response.data.courses)
  }

  useEffect(() => {
    getCourses()
  }, [courses])

  return (
    <div className="min-h-[92vh] p-4 mx-16">
      <div className="w-full flex flex-col space-y-8 justify-center items-center">
        {courses && (
          <div className=" flex flex-wrap justify-center mx-16  gap-6">
            {courses.map((course, index) => (
              <CourseCard
                courses={courses}
                setCourses={setCourses}
                course={course}
                key={index}
              />
            ))}
          </div>
        )}
        <Button
          onClick={() => {
            navigate("/addcourse")
          }}
          variant="contained"
        >
          Create Course
        </Button>
      </div>
    </div>
  )
}

export default Courses
