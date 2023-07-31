import { Stack } from "@mui/material"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <div className="h-[88vh] w-full p-8 flex items-center justify-center">
      <Stack
        alignItems={"center"}
        justifyContent={"center"}
        sx={{ width: "100vw" }}
        direction={{ sm: "column", md: "row" }}
        spacing={4}
      >
        <div className="w-1/2 mt-40 ml-20 h-full flex items-center">
          <img
            className="w-[800px] rounded-xl"
            src="https://media.istockphoto.com/id/1312231371/photo/hand-touching-to-virtual-info-graphics-with-trolley-cart-icons-technology-online-shopping.webp?b=1&s=170667a&w=0&k=20&c=EWXIVYWG_G_9vbdCtQ4R27GZJQ1lyTiF8LPs9jYpddo="
            alt=""
          />
        </div>
        <div className="w-1/2 mt-40  h-full flex flex-col items-center">
          <span className="font-bold text-6xl">OneStore</span>
          <span className="text-lg">One stop ecommerce store</span>
          <Link
            className="mt-10 px-4 py-2 bg-[#4682a9] rounded-lg font-bold text-white"
            to={"/products"}
          >
            View Products
          </Link>
        </div>
      </Stack>
    </div>
  )
}

export default Home
