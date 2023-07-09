import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
/// You need to add input boxes to take input for users to create a course.
/// I've added one input so you understand the api to do it.
function CreateCourse() {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageLink, setImageLink] = useState("")
  const [published, setPublished] = useState(false)
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post(
      "http://localhost:8080/admin/courses",
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

    setTimeout(() => {
      navigate("/courses")
    }, 1000)
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.clear()
    navigate("/login")
    window.location.reload()
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative h-screen flex flex-col space-y-4 items-center justify-center"
    >
      <button
        onClick={logout}
        className="absolute top-5 right-5 text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
      >
        Logout
      </button>
      <h1 className="text-4xl font-bold mb-8">Create Course Page</h1>
      <input
        className="border border-black pl-4 px-4 py-2 rounded"
        placeholder="Title"
        type={"text"}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        className="border border-black pl-4 px-4 py-2 rounded"
        placeholder="Description"
        type={"text"}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        className="border border-black pl-4 px-4 py-2 rounded"
        placeholder="Price in Rupees"
        type={"text"}
        onChange={(e) => setPrice(e.target.value)}
      />
      <input
        className="border border-black pl-4 px-4 py-2 rounded"
        placeholder="Image Link"
        type={"text"}
        onChange={(e) => setImageLink(e.target.value)}
      />
      <button
        className="border border-black px-4 py-2 rounded hover:text-white hover:bg-black duration-200"
        onClick={() => {
          console.log("Submitted!")
        }}
      >
        Create Course
      </button>
      <Link
        to={"/courses"}
        className="absolute bottom-5 right-5 text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
      >
        Go to Courses
      </Link>
    </form>
  )
}
export default CreateCourse
