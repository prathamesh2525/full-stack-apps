import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Login = ({ setUserEmail }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = async () => {
    const user = await axios.post("http://localhost:8080/user/login", {
      email: email,
      password: password,
    })
    if (user.data.message === "Logged in successfully") {
      localStorage.setItem("token", user.data.token)
      setUserEmail(email)
      navigate("/orders")
    }
  }
  return (
    <div className="flex flex-col items-center h-[88vh] w-full ">
      <span className="text-3xl font-bold mt-24 my-4">
        Login to your Account
      </span>
      <div className="px-4 py-6 rounded w-96 border border-black flex flex-col space-y-4 justify-center ">
        <div className="w-full flex flex-col space-y-4 items-start">
          <TextField
            onChange={(e) => setEmail(e.target.value)}
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Email"
            variant="outlined"
          />
          <TextField
            onChange={(e) => setPassword(e.target.value)}
            sx={{ width: "100%" }}
            id="outlined-basic"
            label="Password"
            variant="outlined"
          />
          <Button
            onClick={handleLogin}
            sx={{ backgroundColor: "#4682A9" }}
            variant="contained"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Login
