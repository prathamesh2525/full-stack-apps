import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

const History = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([])

  const getpurchasedCourses = async () => {
    const res = await axios.get(
      "http://localhost:8080/user/purchasedProducts",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    setPurchasedCourses(res.data.purchasedProducts)
  }

  const generateInvoice = async (id) => {
    const response = await axios.post(
      "http://localhost:8080/user/generate-invoice",
      {
        productId: id,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        responseType: "blob",
      }
    )
    const url = window.URL.createObjectURL(
      new Blob([response.data], { type: "application/pdf" })
    )

    const a = document.createElement("a")
    a.href = url

    a.download = "invoice.pdf"
    a.click()
    window.URL.revokeObjectURL(url)
  }

  useEffect(() => {
    getpurchasedCourses()
  }, [])

  return (
    <div className="min-h-screen w-full flex items-center flex-col mb-20">
      <div className="my-6 w-4/5 flex items-center justify-between md:text-4xl font-bold place-self-start border-2 border-gray-300 mx-10 p-4 rounded">
        <span>Your Orders</span>
        <Link
          className="md:text-2xl px-4 py-2 rounded hover:opacity-80 text-white duration-200 bg-slate-800"
          to={"/products"}
        >
          View Products
        </Link>
      </div>
      <div className="w-full mx-10 md:w-1/2 flex gap-10 flex-wrap my-4">
        {purchasedCourses &&
          purchasedCourses.map((p) => (
            // <div
            //   className=" mx-5 border-2 rounded-xl border-gray-200 px-4 py-3  flex space-y-2 flex-col md:flex-row md:space-x-4 md:space-y-0"
            //   key={p._id}
            // >
            //   <div className="w-auto border-2 rounded border-gray-300 p-3">
            //     <img className="w-60" src={p.imageLink} alt="" />
            //   </div>
            //   <div className="relative flex-col flex space-y-2">
            //     <span className="text-xl font-bold">{p.title}</span>
            //     <span className="text-sm"> {p.description}</span>
            //     <button
            //       onClick={() => {
            //         generateInvoice(p._id)
            //       }}
            //       className="font-bold rounded absolute bottom-2 right-2 self-end px-4 py-2 bg-slate-900 text-white"
            //     >
            //       Generate Invoice
            //     </button>
            //   </div>
            // </div>

            <div className="relative max-w-sm bg-white border border-gray-200 rounded-lg shadow text-black ">
              <div class=" absolute right-8  text-6xl text-green-500  h-[45px] w-[20px] ml-1/2 border-b-9 border-r-9 border-green-600">
                ✓
              </div>

              <a href="#">
                <img className="rounded-t-lg" src={p.imageLink} alt="" />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight ">
                    {p.title}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-600">
                  {p.description}
                </p>
                <button
                  onClick={() => {
                    generateInvoice(p._id)
                  }}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-[#4682A9] rounded-lg hover:bg-[#23465e] duration-150 focus:ring-4 focus:outline-none focus:ring-blue-300 "
                >
                  Generate Invoice
                  <svg
                    className="w-3.5 h-3.5 ml-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default History
