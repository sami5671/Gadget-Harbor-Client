import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import TrendingProductCard from "./TrendingProductCard";

const TrendingProducts = () => {
  return (
    <div>
      <SectionTitle
        heading={"Our Trending Products"}
        subHeading={"Happy Shopping with New Trends"}
      ></SectionTitle>
      <TrendingProductCard></TrendingProductCard>
    </div>
  );
};

export default TrendingProducts;
