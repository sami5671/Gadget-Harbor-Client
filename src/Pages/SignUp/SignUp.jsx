import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import registerImg from "../../../src/assets/Images/registerr.jpg";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
// ========================FOR IMAGE HOSTING=========================================
const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
// =================================================================
const SignUp = () => {
  const { createUser, updateUserProfile } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // ======================react hook form============================================
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  // =================================================================

  const onSubmit = async (data) => {
    // =================================================================
    const imageFile = { image: data.photoURL[0] };
    const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const imageUrl = imageRes.data.data.display_url;
    // =================================================================
    createUser(data.email, data.password)
      .then((result) => {
        const loggedUser = result.user;
        console.log(loggedUser);

        updateUserProfile(data.name, imageUrl)
          .then(() => {
            console.log("User profile updated successfully");

            // create user entry to the mongo database
            const userInfo = {
              name: data.name,
              email: data.email,
              photoURL: data.photoURL,
            };
            console.log("image bb: ", userInfo);
            axiosPublic
              .post("/users", userInfo)
              .then((res) => {
                if (res.data.insertedId) {
                  reset();
                  Swal.fire("User created successfully");
                  navigate("/");
                } else {
                  Swal.fire("Error creating user entry in the database");
                }
              })
              .catch((error) => {
                console.error("Error creating user entry:", error.message);
                Swal.fire({
                  icon: "error",
                  title: "Error",
                  text: error.message,
                });
              });
          })
          .catch((error) => {
            console.error("Error updating user profile:", error.message);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: error.message,
            });
          });
      })
      .catch((error) => {
        console.error("Error creating user:", error.message);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message,
        });
      });
  };

  //================================================================
  return (
    <div>
      <Helmet>
        <title>Gadget Harbor || SignUp</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <img className="w-[600px]" src={registerImg} alt="" />
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
                {errors.name && (
                  <span className="text-red-400">name field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  type="file"
                  {...register("photoURL", { required: true })}
                  placeholder="photo URL"
                  className="input input-bordered"
                  required
                />
                {errors.photoURL && (
                  <span className="text-red-400">photoURL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
                {errors.email && (
                  <span className="text-red-400">Email field is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  {...register("password", { required: true })}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                {errors.password && (
                  <span className="text-red-400">
                    Password field is required
                  </span>
                )}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Sign Up"
                />
              </div>
            </form>
            <GoogleLogin></GoogleLogin>
            <p className="px-8">
              <small>
                <Link to="/login"> Already have an account? Login Here...</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
