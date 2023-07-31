import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import UpdateCard from "./UpdateCard"
import "../../src/index.css"

const Course = () => {
  const { courseId } = useParams()
  const [course, setCourse] = useState(null)

  const getCourse = async () => {
    const res = await axios.get(
      `http://localhost:8080/admin/courses/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    setCourse(res.data)
  }

  useEffect(() => {
    getCourse()
  }, [courseId])

  return (
    <div className="min-h-[92vh]">
      {course ? (
        <div className="h-full w-full p-4 flex flex-col justify-center items-center space-y-8 lg:space-y-0 lg:justify-center lg:items-center lg:space-x-56 lg:flex-row">
          <div className="lg:w-1/3 h-full border border-black rounded space-y-2 flex flex-col p-4">
            <div className="">
              <img src={course.imageLink} alt="alt" />
              <h1 className="text-3xl font-bold">{course.title}</h1>
              <p className="text-lg italic">{course.description}</p>
              <div className="flex space-x-8 items-center text-white">
                <div className="px-4 py-2 bg-blue-500 rounded">
                  ${course.price}
                </div>
                <div
                  className={
                    course.published
                      ? "px-4 py-2 bg-green-600 rounded"
                      : "px-4 py-2 bg-red-500 rounded"
                  }
                >
                  {course.published ? "Published" : "Not Published"}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-1/3 h-full">
            <span className="text-xl font-bold bg-growing-underline">
              Update the Course Below
            </span>
            <UpdateCard course={course} setCourse={setCourse} />
          </div>
        </div>
      ) : (
        <h1 className="text-2xl font-bold text-center">Loading...</h1>
      )}
    </div>
  )
}

export default Course
