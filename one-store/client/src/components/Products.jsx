import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const Products = () => {
  const [products, setProducts] = useState([])
  const navigate = useNavigate()

  const getProducts = async () => {
    const res = await axios.get("http://localhost:8080/user/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setProducts(res.data.products)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="mb-20 p-4 flex flex-col space-y-2">
      <span className="text-2xl font-bold">Products</span>
      <div className="flex flex-wrap justify-center gap-6 mx-16">
        {products ? (
          products.map((course) => (
            <div
              onClick={() => {
                navigate(`/products/${course._id}`)
              }}
              className="w-44 md:w-80 flex flex-col space-y-2 items-center shadow-[0_0px_10px_rgba(0,0,0,0.25)] border-gray-500 p-3 rounded hover:cursor-pointer hover:scale-95  duration-200"
              key={course._id}
            >
              <img src={course.imageLink} className="rounded" alt="" />
              <span className="text-xl font-bold">{course.title}</span>
              <span className="text-sm">{course.description}</span>
              <span className="self-start rounded px-4 py-2 bg-slate-800 text-white">
                Rs.{course.price}
              </span>
            </div>
          ))
        ) : (
          <div>Login to continue</div>
        )}
      </div>
    </div>
  )
}

export default Products
