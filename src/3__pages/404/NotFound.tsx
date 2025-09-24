import { useNavigate } from "react-router"

const NotFound = () => {

  const navigate = useNavigate();

  return (
    <section className="flex flex-col items-center h-full justify-center">
      <h1 className="text-theme-text text-6xl " >404</h1>
      <p  className="text-theme-text text-xl mt-2" >Page not found. Please try again &#128531;</p>
      <p  className="text-theme-text text-xm mt-2 underline cursor-pointer" onClick={() => navigate("/")} >Home</p>
    </section>
  )
}

export default NotFound