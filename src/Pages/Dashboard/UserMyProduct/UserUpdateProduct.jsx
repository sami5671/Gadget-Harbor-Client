import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const UserUpdateProduct = () => {
  const userProductInfo = useLoaderData();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  console.log(userProductInfo);

  const {
    ProductName,
    ProductPhoto,
    ProductDescription,
    ProductTag,
    ProductExternalLink,
    _id,
  } = userProductInfo;

  const handleUpdateProduct = (event) => {
    event.preventDefault();
    const form = event.target;
    const updatedProductName = form.ProductName.value;
    const updatedProductPhoto = form.ProductPhotoURL.value;
    const updatedProductDescription = form.ProductDescription.value;
    const updatedProductTag = form.productTag.value;
    const updatedProductExternalLink = form.productExternalLink.value;

    const updatedProduct = {
      ProductName: updatedProductName,
      ProductPhoto: updatedProductPhoto,
      ProductDescription: updatedProductDescription,
      ProductTag: updatedProductTag,
      ProductExternalLink: updatedProductExternalLink,
    };

    axiosPublic
      .patch(`/userUpdateProduct/${_id}`, updatedProduct)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${ProductName} is updated to the menu successfully`,
            showConfirmButton: false,
            timer: 1500,
          });
          // Optionally, you can navigate here
          navigate("/dashboard/myProduct");
        }
      });
  };

  return (
    <>
      <SectionTitle
        heading={"Update your existing Project"}
        subHeading={"update now"}
      ></SectionTitle>

      <section className="px-4">
        <div className="bg-[#b9dbf8] p-4 md:p-24">
          <h2 className="text-3xl md:text-5xl font-extrabold font-rancho text-[#374151] text-center mb-12">
            Update the Gadget <br />({ProductName})
          </h2>
          <form onSubmit={handleUpdateProduct}>
            {/* Reviewer Name and Reviewer PhotoURL row */}
            <div className="mb-4 md:flex">
              <div className="form-control mb-4 md:w-1/2 md:mr-2">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="ProductName"
                    defaultValue={ProductName}
                    placeholder="Product Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Product PhotoURL</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="ProductPhotoURL"
                    defaultValue={ProductPhoto}
                    readOnly
                    placeholder="photoURL"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            {/* Review Description and Rating of the product row */}
            <div className="mb-4 md:flex">
              <div className="form-control mb-4 md:w-full md:mr-2">
                <label className="label">
                  <span className="label-text">Product Description </span>
                </label>
                <label className="input-group">
                  <textarea
                    name="ProductDescription"
                    defaultValue={ProductDescription}
                    placeholder="Write Product Description here......."
                    className="input input-bordered w-full h-40 md:h-auto"
                  ></textarea>
                </label>
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Product Tag</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="productTag"
                    defaultValue={ProductTag}
                    placeholder="Product Tag"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            {/* ============== */}
            <div className="mb-4 md:flex">
              <div className="form-control mb-4 md:w-1/2 md:mr-2">
                <label className="label">
                  <span className="label-text">External Links</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="productExternalLink"
                    defaultValue={ProductExternalLink}
                    placeholder="Product External Link"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            {/* ============== */}
            <input
              type="submit"
              value="Update Product"
              className="btn btn-block bg-cyan-400 text-white hover:text-black"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default UserUpdateProduct;
