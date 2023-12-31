import {
  FaAngular,
  FaFileSignature,
  FaInfoCircle,
  FaTrashRestoreAlt,
} from "react-icons/fa";

import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
// import ProductDetailsPage from "./../../Home/FeaturedProducts/ProductDetailsPage";

const ProductReviewPage = () => {
  // =================================================================
  const axiosSecure = useAxiosSecure();
  const { refetch, data: userAddedProduct = [] } = useQuery({
    queryKey: ["userAddedProducts"],
    queryFn: async () => {
      const res = await axiosSecure.get("/userAddedProduct");
      return res.data;
    },
  });
  console.log(userAddedProduct);
  // =================================================================
  const handleProductFeature = (item) => {
    axiosSecure.patch(`/userAddedProduct/${item._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${item.ProductName} is a Featured Product Now!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  // =================================================================
  const handleProductAccept = (item) => {
    axiosSecure.patch(`/userAccptedProduct/${item._id}`).then((res) => {
      console.log(res.data);
      if (res.data.modifiedCount > 0) {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${item.ProductName} Product has been Accepted!!`,
          showConfirmButton: false,
          timer: 1500,
        });
        refetch();
      }
    });
  };
  //   =================================================================

  const handleDeleteProduct = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/userRejectProduct/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            console.log(res);
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
            refetch();
          }
        });
      }
    });
  };

  // ====================================================================
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
              {userAddedProduct?.map((item, index) => (
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
                    <Link to={`/product/${item._id}`}>
                      <button className="btn bg-cyan-500 btn-xl">
                        <FaInfoCircle className="text-white text-2xl" />
                      </button>
                    </Link>
                  </td>

                  <td className="py-4 px-6">
                    {item.featuredProduct === "true" ? (
                      "Featured Product"
                    ) : (
                      <button
                        onClick={() => handleProductFeature(item)}
                        className="btn bg-cyan-500 btn-xl"
                      >
                        <FaFileSignature className="text-white text-2xl" />
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    {item.AcceptedProduct === "true" ? (
                      "Accepted"
                    ) : (
                      <button
                        onClick={() => handleProductAccept(item)}
                        className="btn bg-cyan-500 btn-xl"
                      >
                        <FaAngular className="text-white text-2xl" />
                      </button>
                    )}
                  </td>
                  <td className="py-4 px-6">
                    <button
                      onClick={() => handleDeleteProduct(item._id)}
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
