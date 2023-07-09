import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSetRecoilState } from "recoil"
import { userState } from "./Register"

/// File is incomplete. You need to add input boxes to take input for users to login.
function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  let token = JSON.parse(localStorage.getItem("token"))

  const setUser = useSetRecoilState(userState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("http://localhost:8080/admin/login", {
      email: email,
      password: password,
    })
    localStorage.setItem("token", JSON.stringify(data.data.token))

    setUser(email)

    window.location.reload()
  }

  const logout = () => {
    localStorage.removeItem("token")
    localStorage.clear()
    window.location.reload()
  }

  useEffect(() => {
    setTimeout(() => {
      if (token) {
        navigate("/about")
      }
    }, 1500)
  }, [])

  return (
    <div className="relative h-screen flex flex-col space-y-4 items-center justify-center">
      {token ? (
        <button
          onClick={logout}
          className="absolute top-5 right-5 text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
        >
          Logout
        </button>
      ) : (
        <>
          <h1 className="text-4xl">Login to the CourseHub</h1>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col space-y-4 items-center"
          >
            <input
              className="border border-teal-500 pl-4 py-2 px-4"
              placeholder="Email"
              type={"text"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border border-teal-500 pl-4 py-2 px-4"
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className=" text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200">
              Login
            </button>
          </form>
        </>
      )}
    </div>
  )
}

export default Login
