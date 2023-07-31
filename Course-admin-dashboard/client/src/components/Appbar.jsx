import { Button, Menu, MenuItem } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Appbar = () => {
  const [user, setUser] = useState("")
  const navigate = useNavigate()

  const getUsername = async () => {
    const res = await axios.get("http://localhost:8080/admin/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    setUser(res.data.username)
  }

  useEffect(() => {
    getUsername()
  }, [])
  return (
    <div className="w-full flex items-center px-4 h-[6vh]  bg-gray-100 border-gray-200 border-b-2 mb-4">
      <div className="hidden lg:flex justify-between w-full">
        <span className="text-2xl font-bold text-blue-700">Courses</span>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="font-bold text-blue-600 hover:opacity-75">
              {user}
            </span>
            <Button
              onClick={() => {
                localStorage.removeItem("token")
                localStorage.clear()
                navigate("/signin")
                window.location.reload()
              }}
              variant="outlined"
              color="error"
            >
              Logout
            </Button>
          </div>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outlined">
              <Link to={"/signup"}>Signup</Link>
            </Button>
            <Button variant="outlined">
              <Link to={"/signin"}>Signin</Link>
            </Button>
          </div>
        )}
      </div>
      <div className="flex lg:hidden justify-center">
        <span className="text-xl font-bold text-blue-700">Coursera</span>
      </div>
    </div>
  )
}

export default Appbar
