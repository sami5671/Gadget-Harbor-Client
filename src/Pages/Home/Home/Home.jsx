import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import TrendingProducts from "../TrendingProducts/TrendingProducts";
import Contact from "../../../Components/Contact.jsx/Contact";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Gadget Harbor || Home</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedProducts></FeaturedProducts>
      <TrendingProducts></TrendingProducts>
      <Contact></Contact>
      hello
    </div>
  );
};

export default Home;
