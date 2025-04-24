import Footer from "@/pages/Home/Footer";
import Navbar from "@/pages/Home/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div >
      <Navbar></Navbar>
      <div className="mt-[90px]">
        <Outlet />
      </div>
      <Footer/>
    </div>
  );
};

export default MainLayout;
