import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import { atom, useSetRecoilState } from "recoil"

export const userState = atom({
  key: "user",
  default: "",
})

/// File is incomplete. You need to add input boxes to take input for users to register.
function Register() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const token = JSON.parse(localStorage.getItem("token"))
  const navigate = useNavigate()

  const setUser = useSetRecoilState(userState)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const data = await axios.post("http://localhost:8080/admin/signup", {
      email: email,
      password: password,
    })
    localStorage.setItem("token", JSON.stringify(data.data.token))

    axios.defaults.headers.common["authorization"] = `Bearer ${token}`
    setUser((user) => user)

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
          <h1 className="text-4xl">Register to the website</h1>
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
              Submit
            </button>
          </form>
          <span className="text-sm"> Already a user?</span>{" "}
          <Link
            className=" text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
            to="/login"
          >
            Login
          </Link>
        </>
      )}
    </div>
  )
}

export default Register
