import { FaEdit, FaTrash } from "react-icons/fa"
import { useNavigate } from "react-router-dom"
import axios from "axios"

const Card = ({ blog, getBlogs }) => {
  const { title, description, _id } = blog
  const navigate = useNavigate()

  const handleDeleteBlog = async (blogId) => {
    console.log(blogId)
    const res = await axios.delete(
      `http://localhost:4747/api/blogs/delete/${blogId}`
    )
    const result = await res.data
    if (result?.message) {
      getBlogs()
    }
  }

  const handleUpdateBlog = async (blog) => {
    navigate("/addBlog", { state: { blog } })
  }

  return (
    <div className="w-72 border px-4 py-2 rounded hover:border-cyan-700 duration-200 transition-all">
      <img className="w-full h-56 border-b mb-2" src="" alt="Image" />
      <h1 className="text-xl font-bold underline mb-1">{title}</h1>
      <p className="text-sm mb-2">{description}</p>
      <div className="flex space-x-3">
        <FaEdit
          onClick={() => handleUpdateBlog(blog)}
          className="cursor-pointer"
          size={20}
        />
        <FaTrash
          className="cursor-pointer"
          onClick={() => handleDeleteBlog(_id)}
          size={20}
        />
      </div>
    </div>
  )
}

export default Card
