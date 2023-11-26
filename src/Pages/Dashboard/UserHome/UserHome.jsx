import useAuth from "../../../Hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

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
    </div>
  );
};

export default UserHome;
