const mongoose = require("mongoose")

const schema = mongoose.Schema

const blogSchema = new schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Blog", blogSchema)
