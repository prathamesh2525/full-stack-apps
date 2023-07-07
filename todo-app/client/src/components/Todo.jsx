import axios from "axios"

const Todo = (props) => {
  const { id, title, description, todos, setTodos } = props
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id))
    axios.delete(`http://localhost:8080/todos/${id}`).then((res) => {
      console.log("Todo Deleted")
    })
  }
  return (
    <div className="h-auto w-full border py-1 rounded flex flex-col items-center">
      <span className="text-2xl font-bold "> {title}</span>
      <p className="my-2">{description}</p>
      <button
        className=" bg-red-800 text-white px-2 py-1 rounded hover:opacity-75 mb-2"
        onClick={() => {
          deleteTodo(id)
        }}
      >
        Delete
      </button>
    </div>
  )
}

export default Todo
