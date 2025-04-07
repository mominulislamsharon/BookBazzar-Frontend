
import { useGetAllBooksQuery } from "@/redux/features/admin/productBookManajment.api";
import { Outlet } from "react-router-dom";

const ProductManagement = () => {

  const {data} = useGetAllBooksQuery(undefined);

  return (
    <div>
      {/* <h1>THis Product managment</h1> */}
      <Outlet></Outlet>
    </div>
  );
};

export default ProductManagement;