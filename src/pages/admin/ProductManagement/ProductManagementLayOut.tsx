import { Outlet } from "react-router-dom";

const ProductManagement = () => {
  return (
    <div>
      {/* <h1>THis Product managment</h1> */}
      <Outlet></Outlet>
    </div>
  );
};

export default ProductManagement;
