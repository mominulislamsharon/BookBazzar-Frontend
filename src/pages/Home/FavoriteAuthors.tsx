import { Link } from "react-router-dom";

const FavoriteAuthors = () => {
  const authors = [
    {
      name: "A © Riddle",
      booksCount: 3,
      image:
        "https://i.postimg.cc/fRTCM4QH/tran-nhu-tuan-ob-FCiz9ni-ZE-unsplash.jpg",
    },
    {
      name: "Andre Aciman",
      booksCount: 2,
      image:
        "https://i.postimg.cc/zGtjBdJq/tony-luginsland-bb-OOTiq-EPA-unsplash.jpg",
    },
    {
      name: "Anna Banks",
      booksCount: 6,
      image: "https://i.postimg.cc/HLF90VcK/fotos-8-ISNp7-Bp-Xd-M-unsplash.jpg",
    },
    {
      name: "Anna Burns",
      booksCount: 2,
      image:
        "https://i.postimg.cc/qRnX1427/julia-potter-T7-XG8-QAn0-Mw-unsplash.jpg",
    },
    {
      name: "Ashlee Vance",
      booksCount: 2,
      image:
        "https://i.postimg.cc/nrJK5g1G/podmatch-2m-Mhao-BGj-Cs-unsplash.jpg",
    },
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl md:text-3xl font-bold">Favorite Authors</h2>
        <Link to="/authors" className="hover:text-[#F75454] hover:underline">
          View All &gt;
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        {authors.map((author, index) => (
          <div key={index} className="flex flex-col items-center text-center">
            <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={author.image}
                alt={author.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <h3 className="font-bold text-lg">{author.name}</h3>
            <p className="text-gray-600 text-sm">
              {author.booksCount} Published Books
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FavoriteAuthors;
