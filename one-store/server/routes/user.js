const express = require("express")
const jwt = require("jsonwebtoken")
const Razorpay = require("razorpay")
const crypto = require("crypto-js")
const pdfDocument = require("pdfkit")
const { v4: uuidv4 } = require("uuid")
const fs = require("fs")

const { User, Product, Payment } = require("../db")
const { authenticateJwt, SECRET_KEY } = require("../middleware/auth")

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
})

const router = express.Router()

let productId

router.post("/signup", async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })
  if (user) {
    res.status(403).json({ message: "User already exists" })
  } else {
    const newUser = new User({ email, password })
    await newUser.save()
    const token = jwt.sign({ email, role: "user" }, SECRET_KEY, {
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
    const token = jwt.sign({ email, role: "user" }, SECRET_KEY, {
      expiresIn: "1h",
    })
    res.json({ message: "Logged in successfully", token })
  } else {
    res.status(403).json({ message: "Invalid email or password" })
  }
})

router.get("/products", authenticateJwt, async (req, res) => {
  const products = await Product.find({})
  res.json({ products })
})

router.get("/products/:productId", authenticateJwt, async (req, res) => {
  const product = await Product.findById(req.params.productId)
  if (product) {
    res.status(200).json({ message: "Product found", product })
  } else res.status(404).json({ message: "Product not found" })
})

router.post("/products/:productId", authenticateJwt, async (req, res) => {
  const product = await Product.findById(req.params.productId)
  productId = req.params.productId

  const options = {
    amount: Number(product.price * 100),
    currency: "INR",
    receipt: uuidv4(),
    payment_capture: 1,
  }

  try {
    const response = await instance.orders.create(options)
    res.json({
      order_id: response.id,
      currency: response.currency,
      amount: response.amount,
    })
  } catch (err) {
    res.status(400).send("Not able to create order. Please try again!")
  }
})

router.post("/paymentverify", authenticateJwt, async (req, res) => {
  const crypto = require("crypto")
  console.log("peyment verifying....")
  // console.log(req.body.response)

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body.response
  const body = razorpay_order_id + "|" + razorpay_payment_id
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(body.toString())
    .digest("hex")
  const isAuthentic = expectedSignature === razorpay_signature
  if (isAuthentic) {
    // Database - payment details appended in the database

    const product = await Product.findById(productId)
    // console.log("Product: ", product)
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    const user = await User.findOne({ email: req.user.email })
    // console.log(user)
    if (!user) {
      return res.status(403).json({ message: "User not found" })
    }
    user.purchasedProducts.push(product)
    // console.log(user)
    await user.save()
    await Payment.create({
      razorpay_order_id: razorpay_order_id,
      razorpay_payment_id: razorpay_payment_id,
      razorpay_signature: razorpay_signature,
      user_id: user._id,
      product_id: product._id,
    })
    // res.location(
    //   `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    // )
    res
      .status(200)
      .json({ message: "Product Purchased Successfully", razorpay_payment_id })
  } else {
    res.status(400).json({
      success: false,
    })
  }
})

router.get("/purchasedProducts", authenticateJwt, async (req, res) => {
  // logic to view purchased courses
  const user = await User.findOne({ email: req.user.email }).populate(
    "purchasedProducts"
  )
  if (user) {
    res.json({ purchasedProducts: user.purchasedProducts || [] })
  } else {
    res.status(403).json({ message: "User not found" })
  }
})

router.post("/generate-invoice", authenticateJwt, async (req, res) => {
  const productId = req.body.productId
  const product = await Product.findById(productId)
  const user = await User.findOne({ email: req.user.email })
  const productPayment = await Payment.findOne({
    user_id: user._id,
    product_id: productId,
  })
  // console.log(user)
  // console.log(product)
  // console.log(productPayment)

  // PDf document ------------------------------------------------------
  const doc = new pdfDocument()

  const item = {
    name: product.title,
    price: product.price,
    description: product.description,
    image: product.imageLink,
  }

  const person = {
    name: user.email,
  }

  const payment = {
    orderId: productPayment.razorpay_order_id,
    paymentId: productPayment.razorpay_payment_id,
  }

  const stream = fs.createWriteStream("invoice.pdf")
  doc.pipe(stream)

  function addImageToPDF(imagePath) {
    doc.image(imagePath, { width: 100, height: 100 })
  }

  function addSection(title, content) {
    doc.fontSize(14).text(title, { underline: true }).moveDown()
    doc.fontSize(12).text(content).moveDown()
  }

  function addDivider() {
    doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke()
  }

  // addImageToPDF(item.image)
  addSection("Product Name:", item.name)
  addSection("Price:", item.price)
  addSection("Description:", item.description)
  addDivider()

  // Add the user details to the PDF
  addSection("User Name:", person.name)
  addDivider()

  // Add the payment details to the PDF
  addSection("Payment - Order ID:", payment.orderId)
  addSection("Payment ID:", payment.paymentId)
  addDivider()

  // Finalize the PDF and close the document

  doc.end()
  res.download("invoice.pdf")

  console.log("PDF created successfully.")

  // const data = fs.readFile(`${__dirname}/invoice.pdf`, (err, file) => {
  //   if (err) {
  //     throw err
  //   }
  //   res.setHeader("Content-Disposition", "attachment; filename=invoice.pdf")
  //   res.setHeader("Content-Type", "application/pdf")

  //   res.send(file)
  // })

  // -----------------------------------------------------------------------------------------------
})

router.get("/me", authenticateJwt, (req, res) => {
  res.json({ username: req.user.email })
})

router.get("/getKey", authenticateJwt, (req, res) => {
  res.status(200).json({ key: process.env.RAZORPAY_API_KEY })
})

module.exports = router
