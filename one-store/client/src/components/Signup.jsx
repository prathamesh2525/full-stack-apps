import { Button, TextField } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

const Signup = ({ setUserEmail }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSignup = async () => {
    const newUser = await axios.post("http://localhost:8080/user/signup", {
      email: email,
      password: password,
    })
    if (newUser.data.message === "User created successfully") {
      setUserEmail(email)
      localStorage.setItem("token", newUser.data.token)
      navigate("/login")
    }
    alert("New User Created")
  }
  return (
    <div className="flex flex-col items-center h-[88vh] w-full ">
      <span className="text-3xl font-bold mt-24 my-4">
        Register A New Account
      </span>
      <div className="px-4 py-6 rounded w-96 border border-black flex flex-col space-y-4 justify-center">
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
            onClick={handleSignup}
            sx={{ backgroundColor: "#4682A9" }}
            variant="contained"
          >
            Register
          </Button>

          <div className="flex flex-col space-y-6 items-start">
            <span className="text-xl font-bold mt-4">
              Already a User? Click here to Login
            </span>

            <Button sx={{ backgroundColor: "#4682A9" }} variant="contained">
              <Link to={"/login"}> Login</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
