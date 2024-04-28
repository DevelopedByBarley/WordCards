import { Outlet } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "../components/Navbar";
import CardsForRepeatAlert from "../components/CardsForRepeatAlert";

const MainLayout = () => {



  return (
    <div>
      <Navbar />
      <CardsForRepeatAlert />
      <Outlet />
      <ToastContainer />
    </div>
  )
}

export default MainLayout