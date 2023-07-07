import { useEffect, useState } from "react"
import axios from "axios"
import "./App.css"
import Todo from "./components/Todo"

function App() {
  const [todos, setTodos] = useState([])
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // fetch all todos from server

  useEffect(() => {
    axios.get("http://localhost:8080/todos").then((response) => {
      setTodos(Array.from(response.data.todos))
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    axios
      .post("http://localhost:8080/todos", {
        title: title,
        description: description,
      })
      .then((response) => {
        const newTodo = {
          title: title,
          description: description,
        }
        setTodos([...todos, newTodo])
      })
    setDescription("")
    setTitle("")
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-white">
      <div className="flex flex-col justify-center items-center">
        <div className=" flex justify-center  bg p-2 md:p-4 w-full">
          <span className="text-2xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Todo App
          </span>
        </div>

        <div className="md:max-w-2xl bg-slate-800 rounded border flex flex-col my-10">
          <form onSubmit={handleSubmit}>
            <input
              className="px-10 md:px-20 py-4 bg-slate-950 selection:border-none border-b focus:outline-none text-xl"
              onChange={(e) => setTitle(e.target.value)}
              type="text"
              value={title}
              placeholder="Add title"
            />

            <div className="flex relative">
              <input
                className="px-10 md:px-20 py-6 bg-slate-950 focus:outline-none text-xl"
                onChange={(e) => {
                  setDescription(e.target.value)
                }}
                type="text"
                value={description}
                placeholder="Write the description"
              ></input>
              <button className="bottom-2 right-2 absolute  bg-green-600 rounded-full px-6 py-2">
                Add
              </button>
            </div>
          </form>
        </div>

        <div className="w-full p-10 flex justify-center">
          <div className="mx-10 md:mx-16 w-full gap-3 md:gap-4  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {todos &&
              todos.map((todo) => (
                <Todo
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  description={todo.description}
                  todos={todos}
                  setTodos={setTodos}
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

/*

<div className="p-4 flex justify-center  bg-gray-900 text-white h-screen">
      <div className=" p-8 rounded">
        <div className=" ">
          <span className="text-4xl font-bold">Todo App</span>
          <form onSubmit={handleSubmit} className="mt-4 ">
            <label className="text-xl" htmlFor="title">
              Title:{" "}
            </label>
            <input
            className="bg-gray-200 text-xl px-2 py-1 rounded-lg"
              onChange={(e) => setTitle(e.target.value)}
              
              type="text"
              value={title}
              id="title"
            />
            <label className="ml-6 text-xl" htmlFor="desc">
              Description:{" "}
            </label>
            <input
              onChange={(e) => {
                setDescription(e.target.value)
              }}
              
              type="text"
              value={description}
              className="bg-slate-200 text-xl px-2 py-1 rounded-lg"
              id="desc"
            />
            <br />
            <button className="mt-4 font-bold bg-green-300 border-black border px-4 py-2 rounded hover:opacity-75">
              Add
            </button>
          </form>
        </div>

        <div className="my-10">
          <span className="text-3xl ">Todos</span>
          <div className="flex flex-wrap justify-center">
            {todos.map((todo) => (
              <Todo
                key={todo.id}
                id={todo.id}
                title={todo.title}
                description={todo.description}
                todos={todos}
                setTodos={setTodos}
              />
            ))}
          </div>
        </div>
      </div>
    </div>

*/
