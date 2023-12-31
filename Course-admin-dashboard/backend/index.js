const express = require("express")
const cors = require("cors")
require("dotenv").config()
const mongoose = require("mongoose")
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")

const app = express()

app.use(cors())
app.use(express.json())

app.use("/admin", adminRouter)
app.use("/user", userRouter)

mongoose.connect(process.env.MONGODB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(8080, () => {
  console.log("Server is listening on port http://localhost:8080")
})
