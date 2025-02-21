import Banner from "./components/layout/Banner";
import Navbar from "./components/layout/Navbar";

function App() {
  return (
    <>
      <div className="bg-white shadow-md fixed top-0 w-full z-50">
        <Navbar></Navbar>
      </div>
      <div className="mt-[88px]">
        <Banner></Banner>
      </div>
    </>
  );
}

export default App;
