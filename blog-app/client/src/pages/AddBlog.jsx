import { useContext, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import axios from "axios"
import { GlobalContext } from "../context"

const AddBlog = () => {
  const { formData, setFormData, setEdit, edit } = useContext(GlobalContext)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.state) {
      const { blog } = location.state
      setEdit(true)
      setFormData({
        title: blog.title,
        description: blog.description,
      })
    }
  }, [location])

  const addBlogToDB = async () => {
    const res = edit
      ? axios.put(
          `http://localhost:4747/api/blogs/update/${location.state.blog._id}`,
          {
            title: formData.title,
            description: formData.description,
          }
        )
      : await axios.post("http://localhost:4747/api/blogs/add", {
          title: formData.title,
          description: formData.description,
        })
    const result = await res.data
    if (result) {
      setEdit(false)
      setFormData({
        title: "",
        description: "",
      })
    }
    navigate("/")
  }

  return (
    <div className="w-full p-4 flex justify-center items-center">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addBlogToDB()
        }}
        className="w-96 flex flex-col items-center space-y-6 border p-8 rounded-xl border-slate-700"
      >
        <h1 className="text-4xl font-bold">
          {edit ? "Edit a Blog" : "Add a Blog"}
        </h1>
        <div className="flex flex-col items-start space-y-2">
          <label className="text-sm font-bold" htmlFor="title">
            Title:
          </label>
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Enter blog title"
            id="title"
            value={formData?.title}
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="flex flex-col items-start space-y-2">
          <label className="text-sm font-bold" htmlFor="desc">
            Description:
          </label>
          <textarea
            className="border p-2 rounded"
            type="text"
            placeholder="Enter blog description"
            id="desc"
            value={formData?.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />
        </div>
        <button
          className=" px-2 py-1 bg-slate-300 text-black rounded border-none font-semibold hover:opacity-80"
          type="submit"
        >
          {edit ? "Edit Blog" : "Add Blog"}
        </button>
      </form>
    </div>
  )
}

export default AddBlog
