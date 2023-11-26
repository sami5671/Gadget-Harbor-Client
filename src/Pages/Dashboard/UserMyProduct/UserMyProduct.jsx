import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { FaEdit, FaTrash } from "react-icons/fa";

const UserMyProduct = () => {
  const [userAddedProduct, setAddedProduct] = useState([]);

  //================================================================
  const axiosPublic = useAxiosPublic();

  useEffect(() => {
    axiosPublic.get("/userAddedProduct").then((res) => {
      setAddedProduct(res.data);
    });
  }, [axiosPublic]);

  console.log(userAddedProduct);
  // =============================================================================
  return (
    <>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Product Name</th>
              <th>Number of votes</th>
              <th>Status</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {userAddedProduct.map((items) => (
              <tr key={items._id}>
                <th></th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img
                          src={items.ProductPhoto}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{items.ProductName}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <br />
                  <span className="badge badge-ghost badge-sm">0</span>
                </td>
                <td>Pending</td>
                <th>
                  <button className="">
                    <FaEdit
                      onClick={`/userUpdateProduct/${items._id}`}
                      className="text-2xl text-cyan-400 hover:text-black"
                    ></FaEdit>
                  </button>
                </th>
                <th>
                  <button className="">
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
