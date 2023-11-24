import { Helmet } from "react-helmet-async";
import { Link, useLocation, useNavigate } from "react-router-dom";
import loginImg from "../../../src/assets/Images/login.png";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

import Swal from "sweetalert2";
import GoogleLogin from "../../Components/GoogleLogin/GoogleLogin";
const Login = () => {
  // =================================================================
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);
  const from = location.state?.from?.pathname || "/";

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    // ----------------------------------------------------------------
    signIn(email, password).then((result) => {
      const user = result.user;
      console.log(user);
      Swal.fire("Login Successful!");
      navigate(from, { replace: true });
    });
  };
  // =================================================================
  return (
    <div>
      <Helmet>
        <title>Gadget Harbor || Login</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col md:flex-row-reverse">
          <div className="text-center md:w-1/2 lg:text-left">
            <img src={loginImg} alt="" />
          </div>
          <div className="card md:w-1/2 flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleLogin} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                  required
                />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              {/* =======recaptcha */}
              {/* <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  onBlur={handleValidationCaptcha}
                  type="text"
                  placeholder="type the ReCaptcha"
                  name="captcha"
                  className="input input-bordered"
                  required
                /> */}
              {/* <button className="btn btn-outline btn-secondary btn-xs">
                  Validate
                </button> */}
              {/* </div> */}
              <div className="form-control mt-6">
                <input
                  // disabled={disabled}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
            </form>
            <GoogleLogin></GoogleLogin>

            <p className="px-8">
              <small>
                New Here?<Link to="/signup"> Create an Account</Link>
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
