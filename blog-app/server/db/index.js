require("dotenv").config()

const mongoose = require("mongoose")

mongoose.set("strictQuery", false)

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.acxwvfw.mongodb.net/`
  )
  .then(() => console.log("Connected MONGODB"))
  .catch((e) => console.log(e))
