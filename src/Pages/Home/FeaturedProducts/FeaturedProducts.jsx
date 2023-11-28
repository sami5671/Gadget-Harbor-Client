import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
// import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import { useState, useEffect } from "react";
import FeaturedProductCard from "./FeaturedProductCard";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";

const FeaturedProducts = () => {
  // const [featuredProduct, setFeaturedProduct] = useState([]);
  // const axiosPublic = useAxiosPublic();

  // useEffect(() => {
  //   axiosSecure.get("/featuredProducts").then((res) => {
  //     setFeaturedProduct(res.data);
  //   });
  // }, [axiosSecure]);

  // =================================================================
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: userAddedProduct = [] } = useQuery({
    queryKey: ["userAddedProduct", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/userAddedProduct");
      return res.data;
    },
  });
  console.log(userAddedProduct);

  // =================================================================
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
          {userAddedProduct.map((cards) => (
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
