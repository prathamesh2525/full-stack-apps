/// This is the landing page. You need to add a link to the login page here.
/// Maybe also check from the backend if the user is already logged in and then show them a logout button

import { Link } from "react-router-dom"

/// Logging a user out is as simple as deleting the token from the local storage.
function Landing() {
  return (
    <div className="h-screen flex flex-col space-y-4 justify-center items-center">
      <h1 className="text-4xl font-bold">Welcome to Coursera!</h1>
      <div className="flex space-x-4">
        <Link
          className=" text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
          to="/register"
        >
          Register
        </Link>
        <Link
          className=" text-teal-500 border-2 border-teal-500 hover:text-white hover:bg-teal-500 px-4 py-2 font-bold rounded duration-200"
          to="/login"
        >
          Login
        </Link>
      </div>
    </div>
  )
}

export default Landing
