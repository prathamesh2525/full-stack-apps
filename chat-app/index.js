const http = require("http")
const express = require("express")
const path = require("path")
const { Server } = require("socket.io")
const fs = require("fs")

const app = express()
const server = http.createServer(app)
const io = new Server(server, { maxHttpBufferSize: 1e8 })

app.use(express.static(path.resolve("./client")))

app.get("/", (req, res) => {
  return res.sendFile("/client/index.html")
})

io.on("connection", (socket) => {
  socket.on("user-1", (message) => {
    io.emit("message", message)
  })

  socket.on("upload", (file, cb) => {
    console.log(file)

    fs.writeFile("./files", file, (err) => {
      cb({ message: err ? "failure" : "success" })
    })
  })
})

server.listen(9000, () =>
  console.log("server started at http://localhost:9000")
)
