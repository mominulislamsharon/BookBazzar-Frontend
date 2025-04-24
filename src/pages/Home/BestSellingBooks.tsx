import { Link } from "react-router-dom";
import { useGetAllBooksQuery } from "@/redux/features/admin/productBookManajment.api";

const BestSellingBooks = () => {
  const { data: productData } = useGetAllBooksQuery(undefined);

  const books = Array.isArray(productData?.data) ? productData.data : [];

  const sortedBooks = [...books].sort((a, b) => b.price - a.price).slice(0, 4);

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Best Selling Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {sortedBooks.map((book) => (
          <Link
            key={book._id}
            to={`/book-details/${book._id}`}
            className="bg-white shadow-md rounded-xl border p-4 flex flex-col items-center text-center hover:shadow-lg transition w-full max-w-[260px]"
          >
            <img
              src={
                book.images ||
                "https://i.postimg.cc/KYn2wW9C/Colorful-Book-Store-Education-Free-Logo.jpg"
              }
              alt={book.title}
              className="w-32 h-44 object-cover mb-4 rounded"
            />
            <h3 className="text-lg font-semibold line-clamp-2">{book.title}</h3>
            <p className="text-sm text-gray-600">{book.author}</p>
            <p className="text-[#F75454] font-bold text-md mt-1">
              ${book.price}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default BestSellingBooks;
