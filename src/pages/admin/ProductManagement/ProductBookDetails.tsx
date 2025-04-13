import { useSingleBooksQuery } from "@/redux/features/admin/productBookManajment.api";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "@/redux/hook";
import { toast } from "sonner"; // or the correct path
import { addToCart, TCartItem } from "@/redux/features/auth/cartSlice";

type BookType = {
  _id: string;
  title: string;
  author: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string;
  category: string;
  inStock: boolean;
  quantity: number;
  createdAt: string;
};

const ProductBookDetails = () => {
  const { id } = useParams<{ id: string }>();

  const bookID = id || " ";

  const { data, isLoading } = useSingleBooksQuery(bookID);
  const book: BookType | undefined = data?.data;

  const dispatch = useAppDispatch();

  // Quantity state
  const [qty, setQty] = useState(1);

  if (isLoading || !book) {
    return <div className="text-center py-10">Loading...</div>;
  }

  // Handle increase/decrease
  const handleDecrease = () => {
    if (qty > 1) setQty(qty - 1);
  };

  const handleIncrease = () => {
    if (qty < book.quantity) setQty(qty + 1);
  };

  const handleAddToCart = () => {
    const cartItem: TCartItem = { ...book, selectedQty: qty };

    dispatch(addToCart(cartItem));
    toast.success(`✅ ${book.title} (${qty}) added to cart`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8 items-start">
      {/* Image */}
      <div className="w-full flex justify-center">
        <img
          src={
            book.images ||
            "https://i.postimg.cc/KYn2wW9C/Colorful-Book-Store-Education-Free-Logo.jpg"
          }
          alt={book.title}
          className="rounded-lg shadow-lg object-contain h-[400px] w-auto"
        />
      </div>

      {/* Book Info */}
      <div>
        <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
        <p className="text-sm text-gray-500 mb-1">by {book.author}</p>
        <p className="text-sm text-gray-400 mb-3">Category: {book.category}</p>

        <div className="flex items-center space-x-4 mb-4">
          <span className="text-2xl font-bold text-black">${book.price}</span>
          {book.originalPrice && (
            <span className="text-md line-through text-gray-400">
              ${book.originalPrice}
            </span>
          )}
        </div>

        <p className="mb-4">{book.description}</p>

        <p
          className={`font-semibold mb-2 ${
            book.inStock ? "text-green-600" : "text-red-500"
          }`}
        >
          {book.inStock ? "✅ In Stock" : "❌ Out of Stock"}
        </p>

        <p className="text-sm text-gray-500 mb-4">
          Available Quantity: {book.quantity}
        </p>

        {/* Quantity Selector */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={handleDecrease}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl"
          >
            −
          </button>
          <span className="text-xl font-semibold">{qty}</span>
          <button
            onClick={handleIncrease}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 text-xl"
          >
            +
          </button>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={handleAddToCart}
          className="bg-blue-600 hover:bg-blue-700 text-white w-full py-2 mt-2 rounded"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductBookDetails;
