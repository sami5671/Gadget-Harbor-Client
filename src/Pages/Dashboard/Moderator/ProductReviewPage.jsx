import { FaTrash, FaUsers } from "react-icons/fa";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const ProductReviewPage = () => {
  // =================================================================

  // =================================================================
  return (
    <>
      <div>
        <SectionTitle
          heading={" Product Review is Here"}
          subHeading={"You Can Accept Or Delete Whatever you want"}
        ></SectionTitle>
      </div>
      <section>
        <h1 className="text-center text-2xl">Total User:</h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">No.</th>
                <th className="py-3 px-6 text-left">Name</th>
                <th className="py-3 px-6 text-left">Email</th>
                <th className="py-3 px-6 text-left">Make Admin</th>
                <th className="py-3 px-6 text-left">Make Moderator </th>
                <th className="py-3 px-6 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6"></td>
                <td className="py-4 px-6">
                  <button
                    //   onClick={() => handleMakeAdmin(user)}
                    className="btn bg-cyan-500 btn-xl"
                  >
                    <FaUsers className="text-white text-2xl" />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    //   onClick={() => handleMakeModerator(user)}
                    className="btn bg-cyan-500 btn-xl"
                  >
                    <FaUsers className="text-white text-2xl" />
                  </button>
                </td>
                <td className="py-4 px-6">
                  <button
                    // onClick={() => handleDeleteUser(user)}
                    className="btn btn-ghost btn-xl"
                  >
                    <FaTrash className="text-red-500 text-2xl" />
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductReviewPage;
