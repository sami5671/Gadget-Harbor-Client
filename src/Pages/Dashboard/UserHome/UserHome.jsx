import { Link } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  // =================================================================

  // =================================================================
  const { user, isSubscribed } = useAuth();
  // =================================================================
  console.log(isSubscribed);
  // =================================================================
  return (
    <div className="max-w-screen-lg mx-auto p-4">
      {/* image */}
      <div className="flex">
        <img
          src={user.photoURL}
          alt="User"
          className="max-w-full h-auto rounded-full md:max-w-md md:h-auto md:rounded-lg"
        />
      </div>
      {/* image */}
      {/* info */}
      <div className="flex flex-col">
        <div className="mb-4 md:mr-4">
          <strong className="block mb-2">User's Name:</strong>
          <span className="bg-gray-100 p-2">{user.displayName}</span>
        </div>
        <div className="mb-4">
          <strong className="block mb-2">User's Email:</strong>
          <span className="bg-gray-100 p-2">{user.email}</span>
        </div>
      </div>
      {/* info */}
      {/* Membership Subscribe Button */}

      <Link to="/dashboard/payment">
        {!isSubscribed && (
          <button className="bg-cyan-500 hover:bg-white hover:text-black text-white px-4 py-2 rounded">
            Subscribe for $12.5
          </button>
        )}
      </Link>
      {/* User Membership Subscription Status */}
      {isSubscribed && (
        <div className="mt-4">
          <strong className="block mb-2">Membership Status:</strong>
          <span className="bg-green-500 text-white px-4 py-2 rounded">
            Verified (paid $12.5)
          </span>
        </div>
      )}
    </div>
  );
};

export default UserHome;
