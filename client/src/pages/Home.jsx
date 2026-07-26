import Navbar from "../components/Layout/Navbar";
import Hero from "../components/Home/Hero";
import Categories from "../components/Home/Categories";
import FeaturedProducts from "../components/Home/FeaturedProducts";
import Footer from "../components/Layout/Footer";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <Footer />
    </>
  );
}

export default Home;