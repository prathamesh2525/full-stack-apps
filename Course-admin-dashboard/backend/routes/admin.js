const express = require("express")
const jwt = require("jsonwebtoken")
const { Course, Admin } = require("../db")
const { authenticateJwt, SECRET } = require("../middleware/auth")

const router = express.Router()

// Admin routes

router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  if (admin) {
    res.status(403).json({ message: "Admin already exists" })
  } else {
    const newAdmin = new Admin({ email, password })
    await newAdmin.save()
    const token = jwt.sign({ email, role: "admin" }, SECRET, {
      expiresIn: "1h",
    })
    res.json({ message: "Admin created successfully", token })
  }
})

router.post("/signin", async (req, res) => {
  // logic to log in admin
  const { email, password } = req.body
  const admin = await Admin.findOne({ email, password })
  if (admin) {
    const token = jwt.sign({ email, role: "admin" }, SECRET, {
      expiresIn: "1h",
    })
    res.json({ message: "Logged in successfully", token })
  } else {
    res.status(403).json({ message: "Invalid email or password" })
  }
})

router.post("/courses", authenticateJwt, async (req, res) => {
  // logic to create a course
  const course = new Course(req.body)
  await course.save()
  res.json({ message: "Course created successfully", courseId: course.id })
})

router.put("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndUpdate(req.params.courseId, req.body, {
    new: true,
  })
  if (course) {
    res.json({ message: "Course updated successfully" })
  } else {
    res.status(404).json({ message: "Course not found" })
  }
})

router.delete("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findByIdAndDelete(req.params.courseId)
  if (course) {
    res.json({ message: "Course deleted Successfully" })
  } else {
    res.status(404).json({ message: "Course not found" })
  }
})

router.get("/courses", authenticateJwt, async (req, res) => {
  // logic to get all courses
  const courses = await Course.find({})
  res.json({ courses })
})

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId)
  if (course) res.json(course)
  else res.status(404).json({ message: "Course not found" })
})

router.get("/me", authenticateJwt, (req, res) => {
  res.json({ username: req.user.email })
})

module.exports = router
