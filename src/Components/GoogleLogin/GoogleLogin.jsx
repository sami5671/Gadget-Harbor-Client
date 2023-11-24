import { useNavigate } from "react-router-dom";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaGoogle } from "react-icons/fa";
const GoogleLogin = () => {
  const { googleSign } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    googleSign().then((result) => {
      console.log(result.user);
      const userInfo = {
        email: result.user?.email,
        name: result.user?.displayName,
        photoURL: result.user?.photoURL,
      };
      axiosPublic.post("/users", userInfo).then((res) => {
        console.log(res.data);
        navigate("/");
      });
    });
  };
  return (
    <div className="px-8">
      <div>
        <div className="divider"></div>
        <button onClick={handleGoogleLogin} className="btn">
          <FaGoogle className="mr-4 text-green-500"></FaGoogle>
          Google
        </button>
      </div>
    </div>
  );
};

export default GoogleLogin;
