import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "./useAuth";
const axiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});
const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  axiosSecure.interceptors.request.use(
    function(config) {
      const token = localStorage.getItem("access-token");
      console.log("request stooped by interceptor", token);
      config.headers.authorization = `Bearer ${token}`;
      return config;
    },
    function(error) {
      return Promise.reject(error);
    }
  );

  // interceptors 401 and 403 status
  axiosSecure.interceptors.response.use(
    function(response) {
      // Any status code that lie within the range of 2xx cause this function to triggerp
      // Do something with response data
      return response;
    },
    async (error) => {
      const status = error.response.status;
      console.log("Error in the interceptor: ", status);
      // for 401 or 403 logout the user and move the user to the login
      if (status === 401 || status === 403) {
        await logOut();
        navigate("/login");
      }
      return Promise.reject(error);
    }
    // {
    //   // Any status codes that falls outside the range of 2xx cause this function to trigger
    //   // Do something with response error

    // }
  );
  return axiosSecure;
};

export default useAxiosSecure;
