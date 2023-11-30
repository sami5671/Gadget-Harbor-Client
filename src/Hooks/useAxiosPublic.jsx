import axios from "axios";

const axiosPublic = axios.create({
  baseURL: "https://gadget-harbor-server.vercel.app",
});
const useAxiosPublic = () => {
  return axiosPublic;
};

export default useAxiosPublic;
