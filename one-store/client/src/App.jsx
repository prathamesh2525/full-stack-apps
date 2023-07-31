import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import "./App.css"
import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Signup from "./components/Signup"
import Login from "./components/Login"
import Products from "./components/Products"
import { useEffect, useState } from "react"
import axios from "axios"
import Product from "./components/Product"
import History from "./components/History"
import Footer from "./components/Footer"
import PaymentSuccess from "./components/PaymentSuccess"

function App() {
  const [userEmail, setUserEmail] = useState(null)

  const init = async () => {
    const res = await axios.get("http://localhost:8080/user/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    if (res.data.username) {
      setUserEmail(res.data.username)
    }
  }

  useEffect(() => {
    init()
  }, [])

  return (
    <div>
      <Router>
        <Navbar userEmail={userEmail} setUserEmail={setUserEmail} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/signup"
            element={<Signup setUserEmail={setUserEmail} />}
          />
          <Route
            path="/login"
            element={<Login setUserEmail={setUserEmail} />}
          />
          <Route
            path="/products"
            element={<Products setUserEmail={setUserEmail} />}
          />
          <Route
            path="/products/:productId"
            element={<Product setUserEmail={setUserEmail} />}
          />
          <Route path="/orders" element={<History />} />
          <Route path="/paymentsuccess" element={<PaymentSuccess />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
