// Import necessary libraries and components
import { Helmet } from "react-helmet-async";
import { useLoaderData } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";

const ProductDetailsPage = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const productDetails = useLoaderData();
  //   console.log(productDetails);
  const { name, image, tags, _id } = productDetails;

  // =================================================================
  const handlePostReview = (event) => {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const description = form.description.value;
    const rating = form.rating.value;

    // console.log(name, photoURL, description, rating);

    //send data to server
    const reviewProduct = {
      ReviewerName: name,
      ReviewerPhoto: photoURL,
      ReviewerDescription: description,
      ReviewerRating: rating,
      ProductId: _id,
    };
    // console.log(reviewProduct);

    axiosPublic.post("/reviews", reviewProduct).then((res) => {
      if (res.data.insertedId) {
        Swal.fire("Your Review post has added successfully");
      }
    });
  };
  // =================================================================
  return (
    <div>
      <Helmet>
        <title>Gadget Harbor || Product Details</title>
      </Helmet>
      <h1 className="lg:mb-24 text-white">hello</h1>
      <SectionTitle
        heading={name}
        subHeading={"----Product Details of-------"}
      ></SectionTitle>

      <section className="flex flex-col lg:flex-row px-4 lg:px-0">
        <div className="lg:mr-8">
          <img className="w-full lg:w-[900px]" src={image} alt="" />
        </div>

        <div>
          <h1 className="text-lg lg:text-xl mb-4">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis
            voluptas, repudiandae deserunt ut nobis quo dolor exercitationem
            aliquam ipsum voluptate, placeat repellendus ea magni vitae mollitia
            cupiditate pariatur illum perspiciatis.
          </h1>
          <div className="mb-4">
            <p>Tag_1: {tags[0]}</p>
            <p>Tag_2: {tags[1]}</p>
            <p>Tag_3: {tags[2]}</p>
          </div>
          <p>External Links: </p>
          <p>UpVote Count: </p>
        </div>
      </section>

      <section>
        <SectionTitle
          heading={"---Product Reviews---"}
          subHeading={name}
        ></SectionTitle>
      </section>
      {/* ---------- */}
      <div className="max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-lg flex py-6">
        <img
          className="w-16 h-16 object-cover object-center rounded-full"
          src={user.photoURL} // Replace with the URL or path to the customer's avatar image
          alt="img"
        />
        <div className="flex flex-col justify-center ml-4">
          <div className="font-bold text-xl mb-2">John Doe</div>
          <p className="text-gray-700 text-base">
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua."
          </p>
          <div className="flex mt-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              5 Stars
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Verified Buyer
            </span>
          </div>
        </div>
      </div>
      {/* ============== */}
      <section>
        <SectionTitle
          subHeading={name}
          heading={"Here you can Post Review "}
        ></SectionTitle>
      </section>
      {/* ------------ */}
      <div className="bg-[#b9dbf8] p-4 md:p-24">
        <h2 className="text-3xl md:text-5xl font-extrabold font-rancho text-[#374151] text-center mb-12">
          Post a review of the Gadget <br />({name})
        </h2>
        <form onSubmit={handlePostReview}>
          {/* Reviewer Name and Reviewer PhotoURL row */}
          <div className="mb-4 md:flex">
            <div className="form-control mb-4 md:w-1/2 md:mr-2">
              <label className="label">
                <span className="label-text">Reviewer Name</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="name"
                  defaultValue={user.displayName}
                  readOnly
                  placeholder="Reviewer's Name"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Reviewer PhotoURL</span>
              </label>
              <label className="input-group">
                <input
                  type="text"
                  name="photoURL"
                  defaultValue={user.photoURL}
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
                <span className="label-text">Review Description </span>
              </label>
              <label className="input-group">
                <textarea
                  name="description"
                  placeholder="Write Review here......."
                  className="input input-bordered w-full h-40 md:h-auto"
                ></textarea>
              </label>
            </div>
            <div className="form-control md:w-1/2">
              <label className="label">
                <span className="label-text">Rating of the product</span>
              </label>
              <label className="input-group">
                <input
                  type="number"
                  name="rating"
                  placeholder="Enter the rating from 1-5"
                  min="1"
                  max="5"
                  className="input input-bordered w-full"
                />
              </label>
            </div>
          </div>

          <input
            type="submit"
            value="Post The Review"
            className="btn btn-block bg-cyan-400 text-white hover:text-black"
          />
        </form>
      </div>

      {/* -------------- */}
    </div>
  );
};

export default ProductDetailsPage;
