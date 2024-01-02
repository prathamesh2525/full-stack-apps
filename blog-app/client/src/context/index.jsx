/* eslint-disable react/prop-types */
import { createContext, useState } from "react"

export const GlobalContext = createContext(null)

export default function GlobalState({ children }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  })
  const [blogs, setBlogs] = useState([])
  const [pending, setPending] = useState(false)
  const [edit, setEdit] = useState(false)
  return (
    <GlobalContext.Provider
      value={{
        formData,
        setFormData,
        blogs,
        setBlogs,
        pending,
        setPending,
        edit,
        setEdit,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}
