const Home = () => {
  return (
    <div className="min-h-[92vh] flex flex-col md:flex-row justify-center space-x-4 p-8">
      <div className=" flex flex-col items-center justify-center">
        <span className="text-6xl">Learn without limits</span>
        <span className="text-xl text-gray-500">
          Start, switch, or advance your career with professional courses
        </span>
      </div>
      <div className="">
        <img
          src="https://img.freepik.com/free-vector/students-using-e-learning-platform-video-laptop-graduation-cap_335657-3285.jpg?w=1380&t=st=1690483241~exp=1690483841~hmac=3c65b0a4e3ce5f3ca464dc606c81d42f59a181a548216a9a3d5a0a9e2b4641f9"
          alt="alt"
        />
      </div>
    </div>
  )
}

export default Home
