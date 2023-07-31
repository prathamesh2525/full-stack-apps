import { Card, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Signup = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  return (
    <div className="min-h-[92vh] flex flex-col items-center justify-center">
      <Typography variant="h5">Welcome to Course Platform. Signup</Typography>
      <Card
        className="p-4 w-2/4  space-y-4 rounded-lg my-4 flex flex-col items-center"
        variant="outlined"
      >
        <TextField
          value={email}
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Email"
          variant="outlined"
        />
        <TextField
          value={password}
          autoComplete="off"
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Password"
          variant="outlined"
        />
        <Button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:8080/admin/signup",
              {
                email: email,
                password: password,
              }
            )
            if (response.data.message === "Admin created successfully") {
              localStorage.setItem("token", response.data.token)
              navigate("/courses")
              document.location.reload()
            }
          }}
          size="large"
          variant="contained"
        >
          SignUp
        </Button>
      </Card>
    </div>
  )
}

export default Signup
