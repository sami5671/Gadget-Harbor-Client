import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const UseFeaturedProducts = () => {
  const axiosSecure = useAxiosSecure();
  //   const { user } = useAuth();
  const { refetch, data: featuredProduct = [] } = useQuery({
    queryKey: ["product"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userAddedProduct`);
      return res.data;
    },
  });
  return [featuredProduct, refetch];
};

export default UseFeaturedProducts;
