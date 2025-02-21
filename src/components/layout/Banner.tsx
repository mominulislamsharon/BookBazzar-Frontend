import bannerImg from "@/assets/images/banner-1.png";

const HeroBanner = () => {
  return (
    <div className="relative w-full min-h-[500px] bg-[#fdf7f5] flex flex-col lg:flex-row items-center px-6 md:px-12 lg:px-20 py-12">
      {/* Left Content */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-4xl md:text-5xl font-bold">
          Huge Discounts on All Books!
        </h2>
        <h4 className="text-md uppercase font-semibold text-gray-500 mt-6">
          Order Now and Get 50% Off!
        </h4>
        <button className="mt-6 bg-black text-white py-3 px-6 rounded-md text-lg hover:bg-gray-800 transition">
          Order Now
        </button>
      </div>

      {/* Right Side (Image) */}
      <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
        <img
          src={bannerImg} 
          alt="Featured Books"
          className="max-w-full w-full drop-shadow-xl object-cover"
        />
      </div>
    </div>
  );
};

export default HeroBanner;
