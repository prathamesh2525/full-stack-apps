import { Button } from "@mui/material"
import axios from "axios"
import crypto from "crypto-js"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

const Product = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  // const [result, setResult] = useState({})
  let result = {}

  const [product, setProduct] = useState(null)
  const [key, setKey] = useState("")
  const [order, setOrder] = useState(null)

  const getProduct = async () => {
    const res = await axios.get(
      `http://localhost:8080/user/products/${productId}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )

    setProduct(res.data.product)
  }

  const handleBuy = async () => {
    const res = await axios.post(
      `http://localhost:8080/user/products/${productId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    setOrder(res.data)
    const data = await axios.get("http://localhost:8080/user/getKey", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setKey(data.data.key)

    const options = {
      key: key,
      amount: order?.amount,
      currency: "INR",
      name: `${product.title}`,
      description: `${product.description}`,
      image: `${product.imageLink}`,
      order_id: order?.order_id,
      // callback_url: "http://localhost:8080/user/paymentverify/",

      handler: async (response) => {
        const res = await axios.post(
          "http://localhost:8080/user/paymentverify",
          {
            response,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        result = res.data
        if (result.message === "Product Purchased Successfully") {
          navigate("/orders")
          alert(`${product.title} successfully purchased!`)
        }
      },

      prefill: {
        name: "xxx",
        email: "xxx@gmail.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#4682A9",
      },
    }
    const razor = new window.Razorpay(options)
    razor.open()
  }

  useEffect(() => {
    getProduct()
  }, [])

  if (!product) return <>Loading...</>
  else
    return (
      <div className="min-h-screen w-full flex justify-center">
        <div className="my-20 w-4/5 h-1/2 md:w-3/5 lg:w-2/5 xl:w-2/6 flex flex-col space-y-2 border border-black rounded-lg p-5">
          <img src={product.imageLink} className="rounded-lg" alt="" />
          <span className="text-3xl font-bold">{product.title}</span>
          <span className="text-lg">{product.description}</span>
          <div className="flex w-full space-x-8">
            <span className="px-4 py-2 bg-slate-900 font-bold text-white rounded-lg">
              Rs.{product.price}
            </span>
            <Button
              onClick={handleBuy}
              sx={{ paddingX: "12px" }}
              variant="contained"
            >
              Buy
            </Button>
          </div>
        </div>
      </div>
    )
}

export default Product
