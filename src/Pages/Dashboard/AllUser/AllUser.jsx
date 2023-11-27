import { FaTrash, FaUsers } from "react-icons/fa";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const AllUser = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });

  return (
    <div>
      <div className="flex flex-col items-center my-4">
        <SectionTitle
          heading={"All Users are here"}
          subHeading={"wo wo wo You can Do whatever You Want"}
        />
      </div>
      <h1 className="text-center text-2xl">Total User: {users.length}</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="py-3 px-6 text-left">No.</th>
              <th className="py-3 px-6 text-left">Name</th>
              <th className="py-3 px-6 text-left">Email</th>
              <th className="py-3 px-6 text-left">Make Moderator</th>
              <th className="py-3 px-6 text-left">Make Admin</th>
              <th className="py-3 px-6 text-left">Delete</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <td className="py-4 px-6">{index + 1}</td>
                <td className="py-4 px-6">{user.name}</td>
                <td className="py-4 px-6">{user.email}</td>
                <td className="py-4 px-6">
                  {user.role === "admin" ? (
                    "Admin"
                  ) : (
                    <button className="btn bg-cyan-500 btn-xl">
                      <FaUsers className="text-white text-2xl" />
                    </button>
                  )}
                </td>
                <td className="py-4 px-6">
                  <button className="btn bg-cyan-500 btn-xl">
                    <FaUsers className="text-white text-2xl" />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button className="btn btn-ghost btn-xl">
                    <FaTrash className="text-red-500 text-2xl" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllUser;
