const express = require("express")
const jwt = require("jsonwebtoken")
const { User, Course } = require("../db")
const { authenticateJwt, SECRET } = require("../middleware/auth")

const router = express.Router()

// User routes
router.post("/signup", async (req, res) => {
  // logic to sign up user
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(403).json({ message: "User already exists" })
  } else {
    const newUser = new User({ email, password })
    await newUser.save()
    const token = jwt.sign({ email, role: "user" }, SECRET, {
      expiresIn: "1h",
    })
    res.json({ message: "User created successfully", token })
  }
})

router.post("/login", async (req, res) => {
  // logic to log in user
  const { email, password } = req.body
  const user = await User.findOne({ email, password })
  if (user) {
    const token = jwt.sign({ email, role: "user" }, SECRET, {
      expiresIn: "1h",
    })
    res.json({ message: "Logged in successfully", token })
  } else {
    res.status(403).json({ message: "Invalid email or password" })
  }
})

router.get("/courses", authenticateJwt, async (req, res) => {
  const courses = await Course.find({})
  res.json({ courses })
})

router.get("/courses/:courseId", authenticateJwt, async (req, res) => {
  const course = await Course.findById(req.params.courseId)
  if (course) {
    res.status(200).json({ message: "Course found", course })
  } else res.status(404).json({ message: "Course not found" })
})

router.post("/courses/:courseId", authenticateJwt, async (req, res) => {
  // logic to purchase a course
  const course = await Course.findById(req.params.courseId)
  if (course) {
    const user = await User.findOne({ email: req.user.email })
    if (user) {
      user.purchasedCourses.push(course)
      await user.save()
      res.json({ message: "Course purchased successfully" })
    } else {
      res.status(403).json({ message: "User not found" })
    }
  } else {
    res.status(404).json({ message: "Course not found" })
  }
})

router.get("/purchasedCourses", authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ email: req.user.email }).populate(
    "purchasedCourses"
  )
  if (user) {
    res.json({ purchasedCourses: user.purchasedCourses || [] })
  } else {
    res.status(403).json({ message: "User not found" })
  }
})

router.get("/me", authenticateJwt, (req, res) => {
  res.json({ username: req.user.email })
})

module.exports = router
