import { Card, TextField, Typography } from "@mui/material"
import Button from "@mui/material/Button"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Signin = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()
  return (
    <div className="h-[82vh] flex flex-col items-center mt-24">
      <Typography variant="h5">Welcome to Course Platform. SignIn</Typography>
      <Card
        className="p-4 w-1/4  space-y-4 rounded-lg my-4 flex flex-col items-center"
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
              "http://localhost:8080/admin/signin",
              {
                email: email,
                password: password,
              }
            )
            if (response.data.message === "Logged in successfully") {
              localStorage.setItem("token", response.data.token)
              navigate("/courses")
              document.location.reload()
            }
          }}
          size="large"
          variant="contained"
        >
          Signin
        </Button>
      </Card>
    </div>
  )
}

export default Signin
