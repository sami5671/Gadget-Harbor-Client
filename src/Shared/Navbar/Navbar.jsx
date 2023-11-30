import { Link } from "react-router-dom";
import useAuth from "./../../Hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  const handleLogOut = () => {
    logOut()
      .then(() => {})
      .catch((error) => console.log(error));
  };

  // =========================navigation here =========================
  const UserMenu = () => (
    <div className="dropdown ">
      <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
        <div className="w-6 lg:w-10 rounded-full">
          <img src={user.photoURL} alt="" />
        </div>
      </label>

      <ul className="menu dropdown-content bg-white px-24 rounded-lg">
        <li>
          <span className=" text-black">{user.displayName || user.email}</span>
        </li>
        <li className="text-black">
          <Link to="/dashboard">Dashboard</Link>
        </li>
        <li className="text-black">
          <button onClick={handleLogOut} className="btn bg-slate-300">
            Logout
          </button>
        </li>
      </ul>
    </div>
  );

  const navOptions = (
    <>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/allAcceptedProducts">Products</Link>
      </li>
      <li>
        <Link to="/aboutUs">About us</Link>
      </li>
      <li className="block lg:hidden">
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
        <Link to="/login">
          <button className="btn font-bold">LOGIN HERE</button>
        </Link>
      )}
    </>
  );
  // =================================================================

  return (
    <>
      <div className="navbar fixed z-10 text-white bg-opacity-30 bg-black max-w-screen-xl">
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
          <a className="btn btn-ghost normal-case text-xl">Gadget Harbor</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{navOptions}</ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
