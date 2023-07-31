const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
require("dotenv").config()
const adminRouter = require("./routes/admin.js")
const userRouter = require("./routes/user")

const PORT = 8080
const app = express()

app.use(cors())
app.use(express.json())

app.use("/admin", adminRouter)
app.use("/user", userRouter)

mongoose.connect(process.env.MONGODB_CONNECTION_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.listen(PORT, () => {
  console.log(`Server running on port http://localhost:${PORT}`)
})
