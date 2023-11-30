// import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useUserMyProduct from "../../../Hooks/useUserMyProduct";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";

const UserMyProduct = () => {
  // const [userAddedProduct, setAddedProduct] = useState([]);

  // //================================================================
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // useEffect(() => {
  //   axiosSecure.get("/userAddedProduct").then((res) => {
  //     setAddedProduct(res.data);
  //   });
  // }, [axiosSecure]);

  const [userProduct, refetch] = useUserMyProduct();
  console.log("here is the data from tan stack", userProduct);
  // console.log(userAddedProduct);
  // =============================================================================

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
        axiosSecure.delete(`/userDeleteProduct/${id}`).then((res) => {
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
  // =============================================================================
  return (
    <>
      <div className="overflow-x-auto">
        <SectionTitle
          heading={"Here Is Your Added Products"}
          subHeading={"Wait For Moderator Approval"}
        ></SectionTitle>

        <h1 className="text-center text-2xl">
          Total Products: {userProduct.length}
        </h1>
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Product Name</th>
              <th>Number of votes</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {userProduct.map((item, i) => (
              <tr key={item._id}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={item.ProductPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{item.ProductName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <br />
                  <span className="badge badge-ghost badge-sm">0</span>
                </td>
                <td>
                  {item.AcceptedProduct === "true" ? "Accepted" : "Pending"}
                </td>
                <th>
                  <Link to={`/dashboard/userUpdateProduct/${item._id}`}>
                    <button className="">
                      <FaEdit className="text-2xl text-cyan-400 hover:text-black"></FaEdit>
                    </button>
                  </Link>
                </th>
                <th>
                  <button
                    onClick={() => handleDeleteProduct(item._id)}
                    className=""
                  >
                    <FaTrash className="text-2xl text-cyan-400 hover:text-red-500"></FaTrash>
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default UserMyProduct;
