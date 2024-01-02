import axios from "axios"
import { useContext, useEffect } from "react"
import { GlobalContext } from "../context"
import Card from "../components/Card"

const Home = () => {
  const { blogs, setBlogs, pending, setPending } = useContext(GlobalContext)
  const getBlogs = async () => {
    setPending(true)
    const res = await axios.get("http://localhost:4747/api/blogs")
    const result = await res.data
    if (result && result.blogList) {
      setBlogs(result.blogList)
      setPending(false)
    }
  }

  useEffect(() => {
    getBlogs()
  }, [])

  return (
    <div className="mx-10 my-10">
      <div>
        <h1 className="text-3xl font-bold mb-8 text-blue-500 transition duration-500 hover:text-red-500">
          Blogs
        </h1>
        {pending ? (
          <>Loading...</>
        ) : (
          <div className="flex flex-wrap gap-6">
            {blogs &&
              blogs.map((blog, idx) => (
                <Card key={idx} blog={blog} getBlogs={getBlogs} />
              ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Home
