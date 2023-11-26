import { FaHome, FaSearch, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:flex-row">
      {/* dashboard side bar */}
      <div className="w-full lg:64 lg:w-1/5 lg:min-h-screen bg-cyan-400">
        <ul className="menu">
          <li>
            <NavLink to="/dashboard/userHome">
              <FaHome></FaHome>user Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/addProduct">
              <FaUtensils></FaUtensils>Add Product
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/myProduct">
              <FaHome></FaHome>My Products
            </NavLink>
          </li>

          {/* shared nav links */}
          <div className="divider">OR</div>

          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <FaSearch></FaSearch> Products
            </NavLink>
          </li>
        </ul>
      </div>

      {/* dashboard content */}
      <div className="flex-1">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default Dashboard;
