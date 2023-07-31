import AppBar from "@mui/material/AppBar"
import Box from "@mui/material/Box"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag"
import { Link, NavLink, useNavigate } from "react-router-dom"

const Navbar = ({ userEmail, setUserEmail }) => {
  const navigate = useNavigate()
  return (
    <div className="">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar sx={{ backgroundColor: "#4682A9" }} position="static">
          <Toolbar>
            {/* <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}
            <Typography
              fontWeight="bold"
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              <div className={"flex items-center space-x-3"}>
                <ShoppingBagIcon />{" "}
                <span className="hover:text-black duration-200">
                  <NavLink to={"/"}>OneStore</NavLink>
                </span>
              </div>
            </Typography>
            {userEmail ? (
              <div className="space-x-4">
                <NavLink
                  className={
                    "mr-10 px-4 py-2 rounded border border-[#205980] duration-300 hover:bg-[#205980]"
                  }
                  to={"/orders"}
                >
                  History
                </NavLink>
                <span>{userEmail}</span>
                <Button
                  onClick={() => {
                    localStorage.removeItem("token")
                    setUserEmail(null)
                    navigate("/")
                  }}
                  variant="contained"
                  color="warning"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div>
                <Button color="inherit">
                  <Link to={"/login"}>Login</Link>
                </Button>
                <Button color="inherit">
                  <Link to={"/signup"}>Signup</Link>
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  )
}

export default Navbar
