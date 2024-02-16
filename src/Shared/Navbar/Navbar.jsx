import { Link } from "react-router-dom";
import useAuth from "./../../Hooks/useAuth";
import { SiProbot } from "react-icons/si";
import { PiApplePodcastsLogoFill } from "react-icons/pi";
import DarkMode from "../../DarkMode/DarkMode";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };
  // =========================navigation here =========================
  const UserMenu = () => (
    <div className="dropdown">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-6 lg:w-10 rounded-full">
          <img src={user.photoURL} alt="" />
        </div>
      </label>
      <ul className="menu dropdown-content mt-4 lg:w-[250px] bg-white font-semibold rounded-md  border-4">
        <li className="">
          <span className="text-teal-400 text-[18px] hover:text-teal-200">
            {user.displayName || user.email}
          </span>
        </li>
        <li className="text-black mt-2 hover:text-white hover:bg-slate-400 rounded-md">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="text-black mt-2 hover:text-white hover:bg-slate-400 rounded-md">
          <button onClick={handleLogOut} className="">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  const navOptions = (
    <>
      <li className="font-bold hover:text-slate-400">
        <Link to="/">Home</Link>
      </li>
      <li className="font-bold hover:text-slate-400">
        <Link to="/allAcceptedProducts">Products</Link>
      </li>
      <li className="font-bold hover:text-slate-400">
        <Link to="/aboutUs">About us</Link>
      </li>
      <li className="font-bold hover:text-slate-400">
        <Link to="/ourAi">
          AI Search <SiProbot className="text-2xl" />
        </Link>
      </li>
      <li className="block lg:hidden font-bold hover:text-slate-400">
        <Link to="/dashboard">Dashboard</Link>

        <div>
          {user && (
            <>
              <div className="w-12">
                <img className="rounded-full" src={user.photoURL} alt="" />
              </div>

              <button
                onClick={handleLogOut}
                className="btn bg-slate-500 text-white"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </li>

      {user ? (
        <>
          <div className="hidden lg:block">
            <UserMenu />
          </div>
        </>
      ) : (
        <div>
          <Link to="/login">
            <button className="border-2 lg:mt-2 px-4 py-1 transition duration-300 ease-in-out hover:bg-slate-500 hover:border-slate-400 rounded-br-lg rounded-tl-lg">
              LOGIN HERE
            </button>
          </Link>
        </div>
      )}
    </>
  );
  // =================================================================

  return (
    <>
      <div className="navbar fixed z-10 text-white bg-opacity-30 bg-black">
        <div className="navbar-start">
          <div className="dropdown lg:hidden">
            <label tabIndex={0} className="btn btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 text-black rounded-box w-52"
            >
              {navOptions}

              {/* <UserMenu></UserMenu> */}
            </ul>
          </div>
          <Link to="/">
            <h1 className="uppercase font-bold text-teal-400 lg:text-xl ml-4">
              <span className="flex items-center gap-2">
                Gadget Harbor
                <PiApplePodcastsLogoFill className="text-5xl" />
              </span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {navOptions}
            <span className="flex items-center">
              <DarkMode />
            </span>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
