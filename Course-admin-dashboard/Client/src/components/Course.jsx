import { Link, useNavigate, useParams } from "react-router-dom"
import { useRecoilValue } from "recoil"
import { courseState } from "./ShowCourses"
import { useState } from "react"
import axios from "axios"
import { userState } from "./Register"

const Course = () => {
  const { id } = useParams("")
  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageLink, setImageLink] = useState("")
  const [published, setPublished] = useState(false)
  const course = useRecoilValue(courseState).find((c) => c._id === id)
  const user = useRecoilValue(userState)
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem("token"))

  const handleSave = async (e) => {
    e.preventDefault()

    const data = await axios.put(
      `http://localhost:8080/admin/courses/${id}`,
      {
        title: title,
        description: description,
        price: price,
        imageLink: imageLink,
        published: published,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    )
    console.log(data.data.message, data.data.courseId)

    alert(
      "Course Updated Successfully, wait for few seconds to save changes..."
    )

    setTimeout(() => {
      navigate("/courses")
      window.location.reload()
    }, 3000)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.clear()
    navigate("/login")
    window.location.reload()
  }

  return (
    <div className="h-screen ">
      <div className="flex  justify-center items-center transition-all duration-300 ">
        <div className="relative flex flex-col items-start space-y-2 w-1/2 h-screen p-4 ">
          <img className="w-full rounded" src={course.imageLink} alt="" />
          <span className="text-2xl font-bold">{course.title}</span>
          <span className="text">{course.description}</span>
          <span className="px-4 py-2 bg-green-500 text-white rounded-lg">
            Rs.{course.price}
          </span>
          <button
            onClick={() => setEdit(true)}
            className="absolute bottom-8 left-8 px-6 py-3 border-2 border-black rounded  duration-200 hover:text-white hover:bg-black"
          >
            Edit
          </button>
          <Link
            className="absolute left-32 bottom-8 px-6 py-3 border-2 border-black rounded duration-200 hover:text-white hover:bg-black"
            to={"/courses"}
          >
            All Courses
          </Link>
        </div>
        {edit && (
          <div className="w-1/2 h-screen p-4">
            <form
              onSubmit={handleSave}
              className="relative h-screen flex flex-col space-y-4 items-center justify-center"
            >
              <button
                onClick={logout}
                className="absolute top-5 right-5 text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
              >
                Logout
              </button>
              <h1 className="text-4xl font-bold mb-8">Edit Course Page</h1>
              <input
                className="border border-black pl-4 px-4 py-2 rounded"
                placeholder="Title"
                type={"text"}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="border border-black pl-4 px-4 py-2 rounded"
                placeholder="Description"
                type={"text"}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <input
                className="border border-black pl-4 px-4 py-2 rounded"
                placeholder="Price in Rupees"
                type={"text"}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                className="border border-black pl-4 px-4 py-2 rounded"
                placeholder="Image Link"
                type={"text"}
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
              />
              <div className="flex space-x-3">
                <label htmlFor="published">Check to Publish the course: </label>
                <input
                  onClick={() => setPublished(!published)}
                  type="checkbox"
                  id="published"
                />
              </div>
              <button
                className="border border-black px-4 py-2 rounded hover:text-white hover:bg-black duration-200"
                onClick={() => {
                  console.log(imageLink)
                }}
              >
                Save
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default Course
