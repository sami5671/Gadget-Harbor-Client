import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";
import useAuth from "./useAuth";

const useUserMyProduct = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { refetch, data: userProduct = [] } = useQuery({
    queryKey: ["product", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/userAddedProduct?email=${user?.email}`
      );
      return res.data;
    },
  });
  return [userProduct, refetch];
};

export default useUserMyProduct;
