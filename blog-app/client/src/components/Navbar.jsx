import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <header>
      <div className="flex justify-between px-10 py-4 border-b-2 border-gray-900">
        <Link to={"/"} className="text-3xl font-bold">
          Blog Site
        </Link>
        <div className="flex justify-between items-center space-x-4">
          <Link
            to={"/"}
            className="px-4 py-1 hover:bg-slate-800 cursor-pointer rounded-lg transition-all ease-in-out duration-200"
          >
            Home
          </Link>
          <Link
            to={"/addBlog"}
            className="px-4 py-1 hover:bg-slate-800 cursor-pointer rounded-lg transition-all ease-in-out duration-200"
          >
            Add Blog
          </Link>
          <a
            href="https://github.com/prathamesh2525"
            rel="noreferrer"
            target="_blank"
            className="px-4 py-1 hover:bg-slate-800 cursor-pointer rounded-lg transition-all ease-in-out duration-200"
          >
            Github
          </a>
        </div>
      </div>
    </header>
  )
}

export default Navbar
