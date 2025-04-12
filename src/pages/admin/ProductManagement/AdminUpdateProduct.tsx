import {
  useSingleBooksQuery,
  useUpdateProductMutation,
} from "@/redux/features/admin/productBookManajment.api";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminUpdateProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const {
    data: productData,
    isLoading,
  } = useSingleBooksQuery(id!, {
    skip: !id,
  });

  const [updateProduct] = useUpdateProductMutation();
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    category: "",
    price: 0,
  });
  useEffect(() => {
    const firstProduct = productData?.data;
    if (firstProduct) {
      setFormData({
        title: firstProduct.title,
        author: firstProduct.author,
        category: firstProduct.category,
        price: firstProduct.price,
      });
    }
  }, [productData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "price" ? parseFloat(value) : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await updateProduct({ id, data: formData }).unwrap();
        toast.success("✅ Product updated successfully");
        navigate("/admin/products/all-products");
      }
    } catch (err) {
      toast.error("❌ Failed to update product");
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Update Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block">
            Author
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            required
          >
            <option value="">Select Category</option>
            <option value="Fiction">Fiction</option>
            <option value="Science">Science</option>
            <option value="SelfDevelopment">Self Development</option>
            <option value="Poetry">Poetry</option>
            <option value="Religious">Religious</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 rounded w-full"
            step="0.01"
            min="0"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default AdminUpdateProduct;
