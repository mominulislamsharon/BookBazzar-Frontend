import { BookOpen, Utensils, Heart, Stethoscope, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: <BookOpen className="w-8 h-8 text-purple-600" />,
    name: "Arts & Photography",
    href: "#",
    bg: "bg-purple-100",
  },
  {
    icon: <Utensils className="w-8 h-8 text-yellow-600" />,
    name: "Food & Drink",
    href: "#",
    bg: "bg-yellow-100",
  },
  {
    icon: <Heart className="w-8 h-8 text-pink-600" />,
    name: "Romance",
    href: "#",
    bg: "bg-pink-100",
  },
  {
    icon: <Stethoscope className="w-8 h-8 text-cyan-600" />,
    name: "Health",
    href: "#",
    bg: "bg-cyan-100",
  },
  {
    icon: <FileText className="w-8 h-8 text-red-600" />,
    name: "Biography",
    href: "#",
    bg: "bg-red-100",
  },
];

const FeaturedCategories = () => {
  return (
    <div>
      <section className="py-12 px-4 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold">Featured Categories</h2>
          <Link
            to="all-products"
            className="text-[#000000] hover:text-[#F75454] hover:underline text-lg font-medium"
          >
            All Categories &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat, index) => (
            <a
              key={index}
              href={cat.href}
              className={`rounded-lg lg:p-12 p-6 md:p-8 flex flex-col items-center text-center transition hover:shadow-md ${cat.bg}`}
            >
              <div className="mb-2">{cat.icon}</div>
              <p className="font-semibold text-sm">{cat.name}</p>
              <span className="text-xs text-gray-600 mt-1">Shop Now</span>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FeaturedCategories;
