import { useGetAllBooksQuery } from "@/redux/features/admin/productBookManajment.api";
import { Link } from "react-router-dom";

const DealsOfTheWeek = () => {
  const { data: productData } = useGetAllBooksQuery(undefined);
  const books = Array.isArray(productData?.data) ? productData.data : [];

  const sortedBooks = [...books].sort((a, b) => b.price - a.price).slice(0, 2);

  return (
    <section className="bg-[#FFF6F6] py-12 ">
      <div className="max-w-7xl min-h-[500px] mx-auto px-4 flex flex-col justify-center ">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">
            Deals of the Week
          </h2>
          <Link
            to="all-products"
            className="text-sm sm:text-base text-[#000000] hover:text-[#F75454] hover:underline"
          >
            View All →
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 bg-white border border-gray-300 rounded-xl overflow-hidden divide-y md:divide-y-0 md:divide-x min-h-[400px] ">
          {sortedBooks.map((book, index) => (
            <Link
              to={`/book-details/${book._id}`}
              key={book._id}
              className="flex flex-col md:flex-row items-center  lg:gap-16 gap-4 p-6"
            >
              <img
                src={book.images}
                alt={book.title}
                className="w-36 h-52 object-cover rounded-md shadow-md "
              />
              <div className="text-left space-y-2">
                <p className="text-sm text-red-500 font-semibold uppercase">
                  {book.category || "KINDLE"}
                </p>
                <h3 className="text-lg font-bold">{book.title}</h3>
                <p className="text-sm text-gray-500">{book.author}</p>
                <div className="mt-1 text-lg font-bold text-black">
                  ${book.price}
                  <span className="text-sm text-gray-400 line-through ml-2">
                    ${index === 0 ? "1000000" : "2000"}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsOfTheWeek;
