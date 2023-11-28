import {
  FaAngular,
  FaFileSignature,
  FaInfoCircle,
  FaTrash,
  FaTrashRestoreAlt,
} from "react-icons/fa";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
// import ProductDetailsPage from "./../../Home/FeaturedProducts/ProductDetailsPage";

const ProductReviewPage = () => {
  // =================================================================
  const axiosSecure = useAxiosSecure();
  const { data: userAddedProduct = [], refetch } = useQuery({
    queryKey: ["userAddedProduct"],
    queryFn: async () => {
      const res = await axiosSecure.get("/userAddedProduct");
      return res.data;
    },
  });
  console.log(userAddedProduct);
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
        <h1 className="text-center text-2xl">
          Total Products: {userAddedProduct.length}
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="py-3 px-6 text-left">No.</th>
                <th className="py-3 px-6 text-left">Product Name</th>
                <th className="py-3 px-6 text-left">Product Photo</th>
                <th className="py-3 px-6 text-left">Product Details</th>
                <th className="py-3 px-6 text-left">Make Featured</th>
                <th className="py-3 px-6 text-left">Accept </th>
                <th className="py-3 px-6 text-left">Reject</th>
              </tr>
            </thead>
            <tbody>
              {userAddedProduct.map((item, index) => (
                <tr key={item._id}>
                  <td className="py-4 px-6">{index + 1}</td>
                  <td className="py-4 px-6">{item.ProductName}</td>
                  <td className="py-4 px-6">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.ProductPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-6">
                    <button
                      //   onClick={() => handleMakeAdmin(user)}
                      className="btn bg-cyan-500 btn-xl"
                    >
                      <FaInfoCircle className="text-white text-2xl" />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      //   onClick={() => handleMakeAdmin(user)}
                      className="btn bg-cyan-500 btn-xl"
                    >
                      <FaFileSignature className="text-white text-2xl" />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      //   onClick={() => handleMakeModerator(user)}
                      className="btn bg-cyan-500 btn-xl"
                    >
                      <FaAngular className="text-white text-2xl" />
                    </button>
                  </td>
                  <td className="py-4 px-6">
                    <button
                      // onClick={() => handleDeleteUser(user)}
                      className="btn btn-ghost btn-xl"
                    >
                      <FaTrashRestoreAlt className="text-red-500 text-2xl" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ProductReviewPage;
