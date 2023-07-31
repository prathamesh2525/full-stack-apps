import { Checkbox, TextField, Card, Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const UpdateCard = ({ course, setCourse }) => {
  const [title, setTitle] = useState(course.title)
  const [desc, setDesc] = useState(course.description)
  const [price, setPrice] = useState(course.price)
  const [imageLink, setImageLink] = useState(course.imageLink)
  const [published, setPublished] = useState(course.published)
  const navigate = useNavigate()
  return (
    <Card
      className="p-4 w-full h-full space-y-4 rounded-lg my-4 flex flex-col items-center"
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
        <Checkbox value={published} onChange={() => setPublished(published)} />{" "}
        <label htmlFor="">Publish</label>
      </div>
      <Button
        onClick={async () => {
           await axios.put(
            `http://localhost:8080/admin/courses/${course._id}`,
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
          let updatedCourse = {
            _id: course._id,
            title: title,
            description: desc,
            imageLink: imageLink,
            price: price,
            published: published,
          }
          setCourse(updatedCourse)
        }}
        size="large"
        variant="contained"
      >
        Update Course
      </Button>
    </Card>
  )
}

export default UpdateCard
