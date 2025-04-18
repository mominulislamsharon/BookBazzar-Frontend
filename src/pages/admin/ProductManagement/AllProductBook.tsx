import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "@/redux/features/admin/productBookManajment.api";
import { useState } from "react";
import { cateGoryOptions } from "@/constants/product";

const AllProductBook = () => {
  const { data: productData } = useGetAllBooksQuery(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const books = Array.isArray(productData?.data) ? productData.data : [];

  const filteredBooks =
    selectedCategory === "All"
      ? books
      : books.filter((book) => book.category === selectedCategory);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-4 md:py-6 mb-4">
      <div className="flex p-6 mb-4">
        <select
          className="border p-2 rounded-md"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          {cateGoryOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-items-center p-4">
        {filteredBooks.map((book) => (
          <Link
            to={`/book-details/${book._id}`}
            key={book._id}
            className="w-full max-w-[260px] border rounded-lg hover:scale-105 hover:shadow-xl transition-transform duration-300"
          >
            <img
              src={
                book.images ||
                "https://i.postimg.cc/KYn2wW9C/Colorful-Book-Store-Education-Free-Logo.jpg"
              }
              alt={book.title}
              className="w-full h-[300px] p-2    object-contain bg-white rounded-t-lg"
            />
            <div className="p-4">
              <p className="text-xs text-red-500 font-semibold uppercase">
                {book.category || "Kindle"}
              </p>
              <h3 className="text-md font-semibold mt-1 line-clamp-2">
                {book.title}
              </h3>
              <p className="text-sm text-gray-600">{book.author}</p>
              <div className="mt-2">
                <span className="text-lg font-bold text-black">
                  ${book.price}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AllProductBook;
