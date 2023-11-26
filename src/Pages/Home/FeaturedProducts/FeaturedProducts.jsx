import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useState, useEffect } from "react";
import FeaturedProductCard from "./FeaturedProductCard";

const FeaturedProducts = () => {
  const [featuredProduct, setFeaturedProduct] = useState([]);
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/featuredProducts").then((res) => {
      setFeaturedProduct(res.data);
    });
  }, [axiosPublic]);

  return (
    <>
      <section>
        <SectionTitle
          heading={"Our Featured Products"}
          subHeading={"We believe in quality not quantity"}
        ></SectionTitle>
      </section>

      <section className="p-4 md:p-16 mx-auto mt-12 lg:mt-8">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {featuredProduct.map((cards) => (
            <FeaturedProductCard
              key={cards._id}
              cards={cards}
            ></FeaturedProductCard>
          ))}
        </div>
      </section>
    </>
  );
};

export default FeaturedProducts;
