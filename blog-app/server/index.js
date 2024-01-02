const express = require("express")
const cors = require("cors")
const blogRouter = require("./routes/blog.route")

const app = express()
const port = 4747

require("./db")

app.use(cors())
app.use(express.json())

app.use("/api/blogs", blogRouter)

app.use("/api", (req, res) => {
  res.send("API running")
})

app.listen(port, () => {
  console.log(`Server Running at Port: http://localhost:${port}`)
})
