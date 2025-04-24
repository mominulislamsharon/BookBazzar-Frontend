// import { useGetAllBooksQuery } from "@/redux/features/admin/productBookManajment.api";
// import { Link } from "react-router-dom";

// const NewReleases = () => {
//   const { data: productData } = useGetAllBooksQuery(undefined);
//   const books = Array.isArray(productData?.data) ? productData.data : [];

//   // Categories for filter
//   const categories = [
//     "Fiction",
//     "Science",
//     "Selfe Development",
//     "Poetry",
//     "Religious",
//   ];

//   return (
//     <section className="py-12 px-4 max-w-7xl mx-auto">
//       {/* Header with filter */}
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
//         <h2 className="text-2xl md:text-3xl font-bold">New Releases</h2>

//         <div className="flex flex-wrap gap-3">
//           {categories.map((category) => (
//             <button
//               key={category}
//               className="px-4 py-2 border border-gray-300 rounded-full text-sm hover:bg-gray-100 transition-colors"
//             >
//               {category}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Main content area */}
//       <div className="flex flex-col lg:flex-row gap-8">
//         {/* Promotional banner - Left side */}
//         <div className="lg:w-2/5">
//           <div className="bg-[#FFF6F6] p-8 rounded-xl min-h-[400px] lg:min-h-[700px] flex flex-col items-center justify-between text-center relative overflow-hidden">
//             {/* Background image at top */}
//             <div
//               className="w-full h-1/2 absolute lg:top-6 top-0 left-0"
//               style={{
//                 backgroundImage:
//                   "url('https://i.postimg.cc/Gtd36xTy/image-book.png')",
//                 backgroundSize: "contain",
//                 backgroundPosition: "center top",
//                 backgroundRepeat: "no-repeat",
//               }}
//             />

//             {/* Content at bottom */}
//             <div className="mt-auto w-full bg-white bg-opacity-90 p-6 rounded-lg z-10">
//               <h3 className="text-3xl font-bold mb-1">Get Extra</h3>
//               <h1 className="text-[#F75454] text-2xl font-semibold mb-2">
//                 Sale -25%
//               </h1>
//               <p className="text-sm text-gray-600 mb-4">ON ORDER OVER $100</p>
//               <Link
//                 to="all-products"
//                 className="inline-block lg:px-12 px-6 lg:py-4 py-2 bg-[#F75454] text-white  hover:bg-[#F52F2F] transition-colors text-base"
//               >
//                 View More
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Right side - Grid of books */}
//         <div className="lg:w-3/5">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
//             {books.slice(0, 4).map((book) => (
//               <div
//                 key={book._id}
//                 className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full"
//               >
//                 <div className="flex gap-4 h-full">
//                   <img
//                     src={book.images}
//                     alt={book.title}
//                     className="w-24 h-32 object-cover rounded"
//                   />
//                   <div className="flex flex-col justify-between">
//                     <div>
//                       <h3 className="font-bold text-lg mb-1 line-clamp-2">
//                         {book.title}
//                       </h3>
//                       <p className="text-sm text-gray-600 mb-2">
//                         {book.author}
//                       </p>
//                     </div>
//                     <p className="text-lg font-bold text-black">
//                       ${book.price}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default NewReleases;

import { useGetAllBooksQuery } from "@/redux/features/admin/productBookManajment.api";
import { Link } from "react-router-dom";
import { useState } from "react";

const NewReleases = () => {
  const { data: productData } = useGetAllBooksQuery(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const books = Array.isArray(productData?.data) ? productData.data : [];

  const filteredBooks = [...books]
    .filter(
      (book) => selectedCategory === "All" || book.category === selectedCategory
    )
    .sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf())
    .slice(0, 4);

  const categories = [
    "All",
    "Fiction",
    "Science",
    "Self Development",
    "Poetry",
    "Religious",
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      {/* Header with filter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <h2 className="text-2xl md:text-3xl font-bold">New Releases</h2>

        <div className="flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 border rounded-full text-sm transition-colors ${
                selectedCategory === category
                  ? "bg-[#F75454] text-white border-[#F75454]"
                  : "border-gray-300 hover:bg-gray-100"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main content area */}
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/5">
          <div className="bg-[#FFF6F6] p-8 rounded-xl min-h-[400px] lg:min-h-[700px] flex flex-col items-center justify-between text-center relative overflow-hidden">
            <div
              className="w-full h-1/2 absolute lg:top-6 top-0 left-0"
              style={{
                backgroundImage:
                  "url('https://i.postimg.cc/Gtd36xTy/image-book.png')",
                backgroundSize: "contain",
                backgroundPosition: "center top",
                backgroundRepeat: "no-repeat",
              }}
            />

            <div className="mt-auto w-full bg-white bg-opacity-90 p-6 rounded-lg z-10">
              <h3 className="text-3xl font-bold mb-1">Get Extra</h3>
              <h1 className="text-[#F75454] text-2xl font-semibold mb-2">
                Sale -25%
              </h1>
              <p className="text-sm text-gray-600 mb-4">ON ORDER OVER $100</p>
              <Link
                to="all-products"
                className="inline-block lg:px-12 px-6 lg:py-4 py-2 bg-[#F75454] text-white rounded-md hover:bg-[#F52F2F] transition-colors text-base"
              >
                View More
              </Link>
            </div>
          </div>
        </div>

        <div className="lg:w-3/5">
          {filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 h-full">
              {filteredBooks.map((book) => (
                <Link
                  to={`/book-details/${book._id}`}
                  key={book._id}
                  className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow h-full flex flex-col"
                >
                  <div className="flex gap-6 h-full">
                    <img
                      src={book.images || "https://via.placeholder.com/150"}
                      alt={book.title}
                      className="w-32 h-40 object-contain rounded"
                    />
                    <div className="flex flex-col justify-between flex-1">
                      <div>
                        <p className="text-sm text-[#F75454] uppercase mb-1">
                          {book.category || "General"}
                        </p>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2">
                          {book.title}
                        </h3>
                        <p className="text-sm text-gray-600">{book.author}</p>
                      </div>
                      <div className="mt-4">
                        <p className="text-lg font-bold text-black">
                          ${book.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg text-center">
              <p className="text-gray-500">No books found in this category</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewReleases;
