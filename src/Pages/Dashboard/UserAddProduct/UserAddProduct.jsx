import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import { useNavigate } from "react-router-dom";

// =================================================================
// =================================================================

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
// =================================================================
const UserAddProduct = () => {
  // ----------------------------------------------------------------
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  // ==========================imgbb host=======================================
  const handleAddProduct = async (event) => {
    event.preventDefault();

    const form = event.target;
    const ProductName = form.ProductName.value;
    const ProductPhoto = form.ProductPhotoURL.files[0];
    const ProductDescription = form.ProductDescription.value;
    const ProductOwnerName = form.productOwnerName.value;
    const ProductOwnerPhoto = form.ProductOwnerPhoto.value;
    const ProductOwnerEmail = form.ProductOwnerEmail.value;

    const ProductTag = form.productTag.value;
    const ProductExternalLink = form.productExternalLink.value;

    try {
      const imageFile = new FormData();
      imageFile.append("image", ProductPhoto);
      const imageRes = await axiosPublic.post(image_hosting_api, imageFile);
      const imageUrl = imageRes.data.data.url;
      // send data to imgbb
      const AddProduct = {
        ProductName: ProductName,
        ProductPhoto: imageUrl,
        ProductDescription: ProductDescription,
        ProductOwnerName: ProductOwnerName,
        ProductOwnerPhoto: ProductOwnerPhoto,
        ProductOwnerEmail: ProductOwnerEmail,
        ProductTag: ProductTag,
        ProductExternalLink: ProductExternalLink,
      };
      // Add product data to mongodb
      const res = await axiosPublic.post("/userAddedProduct", AddProduct);
      if (res.data.insertedId) {
        Swal.fire("The Product has been added successfully");
        navigate("/dashboard/myProduct");
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  // ===========================================
  // ===========================POST THE REVIEW ======================================
  // const handleAddProduct = async (event) => {
  //   event.preventDefault();

  //   const onSubmit = async (data) => {
  //     console.log(data);
  //     const imageFile = { image: data.image[0] };
  //     const res = await axiosPublic.post(image_hosting_api, imageFile, {
  //       headers: {
  //         "content-type": "multipart/form-data",
  //       },
  //     });
  //     // Handle the response as needed
  //   };

  //   const form = event.target;
  //   const ProductName = form.ProductName.value;
  //   const ProductPhoto = form.ProductPhotoURL.value;
  //   const ProductDescription = form.ProductDescription.value;
  //   const ProductOwnerName = form.productOwnerName.value;
  //   const ProductOwnerPhoto = form.ProductOwnerPhoto.value;
  //   const ProductOwnerEmail = form.ProductOwnerEmail.value;

  //   const ProductTag = form.productTag.value;
  //   const ProductExternalLink = form.productExternalLink.value;

  //   // send data to server
  //   const AddProduct = {
  //     ProductName: ProductName,
  //     ProductPhoto: ProductPhoto,
  //     ProductDescription: ProductDescription,
  //     ProductOwnerName: ProductOwnerName,
  //     ProductOwnerPhoto: ProductOwnerPhoto,
  //     ProductOwnerEmail: ProductOwnerEmail,
  //     ProductTag: ProductTag,
  //     ProductExternalLink: ProductExternalLink,
  //   };

  //   axiosPublic.post("/userAddedProduct", AddProduct).then((res) => {
  //     if (res.data.insertedId) {
  //       Swal.fire("The Product has added successfully");
  //       navigate("/dashboard/myProduct");
  //     }
  //   });
  // };
  // =================================================================
  // ----------------------------------------------------------------
  return (
    <>
      <section>
        <SectionTitle
          heading={"Here you can add products"}
          subHeading={"Add your Product"}
        ></SectionTitle>
      </section>

      <section className="px-6 lg:px-12">
        <div className="bg-[#b9dbf8] p-4 md:p-24">
          <h2 className="text-3xl md:text-5xl font-extrabold font-rancho text-[#374151] text-center mb-12">
            Add Your product
          </h2>
          <form onSubmit={handleAddProduct}>
            {/* add product */}
            <div className="mb-4 md:flex">
              <div className="form-control mb-4 md:w-1/2 md:mr-2">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="ProductName"
                    required
                    placeholder="Products Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Product Photo</span>
                </label>
                <label className="input-group">
                  <input
                    type="file"
                    name="ProductPhotoURL"
                    required
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
                    placeholder="Write Product here......."
                    required
                    className="input input-bordered w-full h-40 md:h-auto"
                  ></textarea>
                </label>
              </div>
              {/* Product Owner info */}
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold font-rancho text-[#374151] text-center mb-12">
              Product Owner Info
            </h2>
            <div className="mb-4 md:flex">
              <div className="form-control mb-4 md:w-1/2 md:mr-2">
                <label className="label">
                  <span className="label-text">Product Owner Name</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="productOwnerName"
                    defaultValue={user.displayName}
                    readOnly
                    placeholder="Products Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="form-control md:w-1/2">
                <label className="label">
                  <span className="label-text">Product Owner Photo URL</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="ProductOwnerPhoto"
                    defaultValue={user.photoURL}
                    readOnly
                    placeholder="photoURL"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            {/* ------------------------------ */}
            <div className="mb-4 md:flex">
              <div className="form-control mb-4 md:w-1/2 md:mr-2">
                <label className="label">
                  <span className="label-text">Product Owner Email</span>
                </label>
                <label className="input-group">
                  <input
                    type="email"
                    name="ProductOwnerEmail"
                    readOnly
                    defaultValue={user.email}
                    placeholder="Products Name"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>

            {/* =========================  */}
            <div className="mb-4 md:flex">
              <div className="form-control mb-4 md:w-1/2 md:mr-2">
                <label className="label">
                  <span className="label-text">Product Tag</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="productTag"
                    placeholder="Product Tag"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
              <div className="form-control mb-4 md:w-1/2 md:mr-2">
                <label className="label">
                  <span className="label-text">Product External Links</span>
                </label>
                <label className="input-group">
                  <input
                    type="text"
                    name="productExternalLink"
                    placeholder="Products Tag"
                    className="input input-bordered w-full"
                  />
                </label>
              </div>
            </div>
            <input
              type="submit"
              value="Add the Product"
              className="btn btn-block bg-cyan-400 text-white hover:text-black"
            />
          </form>
        </div>
      </section>
    </>
  );
};

export default UserAddProduct;
