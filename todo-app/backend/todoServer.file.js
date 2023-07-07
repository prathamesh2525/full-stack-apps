const express = require("express")
const bodyParser = require("body-parser")
const fs = require("fs")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
dotenv.config()

const app = express()
const port = 8080

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Mongoose Schema

const todoSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  completed: Boolean,
})

const Todo = mongoose.model("Todo", todoSchema)

mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

app.get("/todos", async (req, res) => {
  const todos = await Todo.find({})
  res.json({ todos })
})

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findOne({ id: req.params.id })
  if (todo) {
    res.json({ message: "Todo found", todo })
  } else {
    res.status(404).json({ message: "Todo not found" })
  }
})

app.post("/todos", async (req, res) => {
  const todo = {
    id: uuidv4(),
    title: req.body.title,
    description: req.body.description,
    completed: false,
  }
  const newTodo = new Todo(todo)
  await newTodo.save()
  res.json({ message: "New todo added" })
})

app.put("/todos/:id", (req, res) => {
  fs.readFile("todos.json", "utf-8", (err, data) => {
    if (err) throw err
    const todos = JSON.parse(data)
    const index = todos.findIndex((todo) => todo.id === req.params.id)

    if (index === -1) {
      res.status(404).send()
    } else {
      const updatedTodo = {
        id: todos[index].id,
        title: req.body.title,
        description: req.body.description,
        completed: true,
      }
      todos[index] = updatedTodo
      fs.writeFile("todos.json", JSON.stringify(todos), (err) => {
        if (err) throw err
        res.status(201).json(updatedTodo)
      })
    }
  })
})

app.delete("/todos/:id", async (req, res) => {
  const todo = await Todo.deleteOne({ id: req.params.id })
  if (todo) {
    res.json({ message: "Todo Deleted", todo })
  } else {
    res.status(404).json({ message: "Todo not found" })
  }
})

app.get("/*", (req, res) => {
  res.status(404).send("Error: Route not found")
})

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:8080`)
})

module.exports = app
