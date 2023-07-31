import { Card, Checkbox, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const AddCourse = () => {
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [price, setPrice] = useState("")
  const [imageLink, setImageLink] = useState("")
  const [published, setPublished] = useState(false)

  const navigate = useNavigate()
  return (
    <div className="min-h-[92vh] flex flex-col items-center justify-center">
      <Card
        className="p-4 w-1/3  space-y-4 rounded-lg my-4 flex flex-col items-center"
        variant="elevation"
      >
        <TextField
          value={title}
          autoComplete="off"
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Title"
          variant="outlined"
        />
        <TextField
          value={desc}
          autoComplete="off"
          onChange={(e) => setDesc(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Description"
          variant="outlined"
        />
        <TextField
          value={price}
          autoComplete="off"
          onChange={(e) => setPrice(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Price ($)"
          variant="outlined"
        />
        <TextField
          value={imageLink}
          autoComplete="off"
          onChange={(e) => setImageLink(e.target.value)}
          fullWidth
          id="outlined-basic"
          label="Image Link"
          variant="outlined"
        />
        <div>
          <Checkbox onChange={() => setPublished(!published)} />{" "}
          <label htmlFor="">Publish</label>
        </div>
        <Button
          onClick={async () => {
            const response = await axios.post(
              "http://localhost:8080/admin/courses",
              {
                title: title,
                description: desc,
                price: price,
                imageLink: imageLink,
                published: published,
              },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }
            )
            if (response.data.message === "Course created successfully") {
              console.log("Course created successfully")
              navigate("/courses")
            }
          }}
          size="large"
          variant="contained"
        >
          Add Course
        </Button>
      </Card>
    </div>
  )
}

export default AddCourse
