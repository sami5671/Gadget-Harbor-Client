import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Gadget Harbor || Home</title>
      </Helmet>
      <Banner></Banner>
      <FeaturedProducts></FeaturedProducts>
    </div>
  );
};

export default Home;
