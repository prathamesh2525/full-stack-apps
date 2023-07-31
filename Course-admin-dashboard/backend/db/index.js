const mongoose = require("mongoose")

// Mongoose schemas

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  purchasedCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
})

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
})

const courseSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
})

// Define mongoose models
const User = mongoose.model("User", userSchema)
const Admin = mongoose.model("Admin", adminSchema)
const Course = mongoose.model("Course", courseSchema)

module.exports = {
  User,
  Admin,
  Course,
}
