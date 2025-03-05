import Navbar from "@/pages/Home/Navbar";
import { Outlet } from "react-router-dom";
const MainLayout = () => {
  return (
    <div >
      <Navbar></Navbar>
      <div className="mt-[90px]">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
