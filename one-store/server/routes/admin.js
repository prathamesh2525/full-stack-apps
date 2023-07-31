const express = require("express")
const jwt = require("jsonwebtoken")
const { Admin, Product } = require("../db")
const { authenticateJwt, SECRET_KEY } = require("../middleware/auth")

const router = express.Router()

router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const { email, password } = req.body
  const admin = await Admin.findOne({ email })
  if (admin) {
    res.status(403).json({ message: "Admin already exists" })
  } else {
    const newAdmin = new Admin({ email, password })
    await newAdmin.save()
    const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, {
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
    const token = jwt.sign({ email, role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    })
    res.json({ message: "Logged in successfully", token })
  } else {
    res.status(403).json({ message: "Invalid email or password" })
  }
})

router.post("/products", authenticateJwt, async (req, res) => {
  // logic to create a course
  const product = new Product(req.body)
  await product.save()
  res.json({ message: "product listed successfully", productId: product.id })
})

router.put("/products/:productId", authenticateJwt, async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body,
    {
      new: true,
    }
  )
  if (product) {
    res.json({ message: "Product updated successfully" })
  } else {
    res.status(404).json({ message: "Product not found" })
  }
})

router.delete("/products/:productId", authenticateJwt, async (req, res) => {
  const product = await Product.findByIdAndDelete(req.params.productId)
  if (product) {
    res.json({ message: "Product deleted Successfully" })
  } else {
    res.status(404).json({ message: "Product not found" })
  }
})

router.get("/products", authenticateJwt, async (req, res) => {
  // logic to get all courses
  const products = await Product.find({})
  res.json({ products })
})

router.get("/products/:productId", authenticateJwt, async (req, res) => {
  const product = await Product.findById(req.params.productId)
  if (product) res.json(product)
  else res.status(404).json({ message: "Product not found" })
})

router.get("/me", authenticateJwt, (req, res) => {
  res.json({ username: req.user.email })
})

module.exports = router
