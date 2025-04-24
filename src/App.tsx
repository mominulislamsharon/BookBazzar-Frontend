import Banner from "./pages/Home/Banner";
import BestSellingBooks from "./pages/Home/BestSellingBooks";
import DealsOfTheWeek from "./pages/Home/DealsOfTheWeek";
import FavoriteAuthors from "./pages/Home/FavoriteAuthors";
import FeaturedCategories from "./pages/Home/FeaturedCategories";
import NewReleases from "./pages/Home/NewReleases";

function App() {
  return (
    <>
      <div className="mt-[83px]">
        <Banner></Banner>
        <FeaturedCategories/>
        <BestSellingBooks/>
        <DealsOfTheWeek/>
        <NewReleases/>
        <FavoriteAuthors/>
      </div>
    </>
  );
}

export default App;
