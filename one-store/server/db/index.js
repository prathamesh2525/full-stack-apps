const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
  email: String,
  password: String,
  purchasedProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
})

const adminSchema = new mongoose.Schema({
  email: String,
  password: String,
})

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  available: Boolean,
})

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
  },
  razorpay_payment_id: {
    type: String,
    required: true,
  },
  razorpay_signature: {
    type: String,
    required: true,
  },
  user_id: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
})

const User = mongoose.model("User", userSchema)
const Admin = mongoose.model("Admin", adminSchema)
const Product = mongoose.model("Product", productSchema)
const Payment = mongoose.model("Payment", paymentSchema)

module.exports = {
  User,
  Admin,
  Product,
  Payment,
}
