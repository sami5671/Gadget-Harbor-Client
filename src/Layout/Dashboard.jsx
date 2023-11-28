import {
  FaChartBar,
  FaHome,
  FaIdCard,
  FaSearch,
  FaUsers,
  FaUtensils,
} from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import UseAdmin from "../Hooks/UseAdmin";

const Dashboard = () => {
  const [isAdmin] = UseAdmin();
  return (
    <div className="flex flex-col lg:flex-row">
      {/* dashboard side bar */}
      <div className="w-full lg:64 lg:w-1/5 lg:min-h-screen bg-cyan-400">
        <ul className="menu ">
          {isAdmin ? (
            <>
              <li>
                <NavLink to="/dashboard/users">
                  <FaUsers></FaUsers>Manage Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/statistics">
                  <FaChartBar></FaChartBar>
                  Statistics
                </NavLink>
              </li>
              <li>
                <NavLink to="/dashboard/manageCoupons">
                  <FaIdCard></FaIdCard>Manage Coupons
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
            </>
          )}
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
