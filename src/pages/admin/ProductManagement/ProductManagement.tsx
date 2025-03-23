import { useGetAllBooksQuery } from "@/redux/features/ProductBook/productBookApi";

const ProductManagement = () => {

  const {data} = useGetAllBooksQuery(undefined);

  return (
    <div>
      <h1>THis Product managment</h1>
    </div>
  );
};

export default ProductManagement;