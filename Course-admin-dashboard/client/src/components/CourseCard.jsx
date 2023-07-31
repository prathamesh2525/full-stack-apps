import Card from "@mui/material/Card"
import CardActions from "@mui/material/CardActions"
import Button from "@mui/material/Button"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const CourseCard = ({ course, courses, setCourses }) => {
  const { title, description, imageLink } = course
  const navigate = useNavigate()
  const handleDelete = async () => {
    setCourses(courses.filter((c) => c._id !== course._id))
    const response = await axios.delete(
      `http://localhost:8080/admin/courses/${course._id}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
    console.log(response.data)
  }

  return (
    <Card className="w-80 h-auto">
      <img className="w-full" alt="alt" src={imageLink} />
      <div className="flex flex-col items-start p-4">
        <span className="text-xl font-bold">{title}</span>
        <span className="text-lg">{description}</span>
      </div>
      <CardActions>
        <Button
          onClick={() => {
            navigate(`/courses/${course._id}`)
          }}
          size="small"
          variant="outlined"
          color="info"
        >
          Edit
        </Button>
        <Button
          onClick={() => {
            if (confirm("Click Ok to Delete") === true) {
              handleDelete()
            }
          }}
          color="error"
          variant="outlined"
          size="small"
        >
          Delete
        </Button>
      </CardActions>
    </Card>
  )
}

export default CourseCard
