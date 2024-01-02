const mongoose = require("mongoose")
const Blog = require("../model/Blog")

//fetch list of blogs

const fetchBlogs = async (req, res) => {
  let blogList
  try {
    blogList = await Blog.find()
  } catch (error) {
    console.log(error)
  }

  if (!blogList) {
    return res.status(404).json({ message: "No Blogs Found" })
  }

  return res.status(200).json({ blogList })
}

// add a new blog

const addNewBlog = async (req, res) => {
  const { title, description } = req.body
  const currentDate = new Date()

  const session = await mongoose.startSession()
  session.startTransaction()

  const newBlog = new Blog({
    title,
    description,
    date: currentDate,
  })

  try {
    await newBlog.save()
  } catch (error) {
    console.log(error)
  }

  try {
    await newBlog.save(session)
    session.commitTransaction()
  } catch (error) {
    await session.abortTransaction()
    return res.send(500).json({ message: error })
  } finally {
    session.endSession()
  }
  return res.status(201).json({ newBlog })
}

// delete a blog

const deleteBlog = async (req, res) => {
  const id = req.params.id
  try {
    const findCurrentBlog = await Blog.findByIdAndDelete(id)
    if (!findCurrentBlog)
      return res.status(404).json({ message: "Blog not Found" })
  } catch (error) {
    console.log(error)
    return res
      .status(500)
      .json({ message: "Unable to delete! please try again" })
  }
  return res.status(200).json({ message: "Successfully Deleted the Blog" })
}

// update a blog

const updateBlog = async (req, res) => {
  const id = req.params.id
  const { title, description } = req.body
  let currentBlogToUpdate
  try {
    currentBlogToUpdate = await Blog.findByIdAndUpdate(id, {
      title,
      description,
    })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong while Updating! Please try again",
    })
  }
  if (!currentBlogToUpdate) {
    return res.status(500).json({ message: "Unable to Update" })
  }
  return res.status(200).json({ currentBlogToUpdate })
}

module.exports = { fetchBlogs, addNewBlog, deleteBlog, updateBlog }
