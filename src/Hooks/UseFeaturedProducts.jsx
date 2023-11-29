import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
// import useAxiosSecure from "./useAxiosSecure";
import useAxiosPublic from "./useAxiosPublic";

const UseFeaturedProducts = () => {
  const axiosPublic = useAxiosPublic();
  //   const { user } = useAuth();
  const { refetch, data: featuredProduct = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/userAddedProduct`);
      return res.data;
    },
  });
  return [featuredProduct, refetch];
};

export default UseFeaturedProducts;
