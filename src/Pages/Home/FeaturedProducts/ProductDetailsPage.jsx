// Import necessary libraries and components
import { Helmet } from "react-helmet-async";
import { useLoaderData, useNavigate } from "react-router-dom";
import SectionTitle from "../../../Components/SectionTitle/SectionTitle";
import useAuth from "../../../Hooks/useAuth";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import ProductReviewCard from "./ProductReviewCard";
import { FaReplyAll, FaThumbsUp } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const ProductDetailsPage = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const productDetails = useLoaderData();
  const navigate = useNavigate();
  const { ProductName, ProductPhoto, ProductTag, ProductDescription, _id } =
    productDetails;
  const [review, setReview] = useState([]);

  // =================================================================================================
  const axiosSecure = useAxiosSecure();
  const { refetch, data: userAddedProduct = [] } = useQuery({
    queryKey: ["userAddedProduct"],
    queryFn: async () => {
      const res = await axiosSecure.get(`/userAddedProduct/${_id}`);
      return res.data;
    },
  });
  console.log(userAddedProduct);
  // const handleReportProduct = (item) => {
  //   axiosSecure.patch(`/userReportedProduct/${item._id}`).then((res) => {
  //     console.log(res.data);
  //     if (res.data.modifiedCount > 0) {
  //       Swal.fire({
  //         position: "top-end",
  //         icon: "success",
  //         title: `${item.ProductName} is a Featured Product Now!!`,
  //         showConfirmButton: false,
  //         timer: 1500,
  //       });
  //     }
  //   });
  // };
  // =======================for upvVote and Report ==========================================
  const [votesUp, setVotesUp] = useState(0);
  // const [report, setReport] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpVote = () => {
    if (user && !hasVoted) {
      setVotesUp(votesUp + 1);
      setHasVoted(true);
    } else {
      navigate("/login");
    }
  };
  // const handleDownVote = () => {
  //   if (user && !hasVoted) {
  //     setReport(report + 1);
  //     setHasVoted(true);
  //   } else {
  //     navigate("/login");
  //   }
  // };
  // =================================================================
  //   console.log(productDetails);

  // ===========================POST THE REVIEW ======================================
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
  // =======================for getting the review ==========================================
  useEffect(() => {
    axiosPublic.get("/reviews").then((res) => {
      setReview(res.data);
    });
  }, [axiosPublic]);
  // =================================================================
  return (
    <div>
      <Helmet>
        <title>Gadget Harbor || Product Details</title>
      </Helmet>
      <h1 className="lg:mb-24 text-white">hello</h1>
      <SectionTitle
        heading={ProductName}
        subHeading={"----Product Details of-------"}
      ></SectionTitle>

      <section className="flex flex-col lg:flex-row px-4 lg:px-0">
        <div className="lg:mr-8">
          <img
            className="w-full lg:w-[900px] lg:h-[400px]"
            src={ProductPhoto}
            alt=""
          />
        </div>

        <div>
          <h1 className="text-lg lg:text-xl mb-4">{ProductDescription}</h1>
          <div className="mb-4">
            <p>
              <span className=" text-2xl font-bold">Tag: </span>
              {ProductTag}
            </p>
          </div>
          <p>External Links: </p>
          <p>UpVote Count: </p>
          <button
            onClick={handleUpVote}
            className={`btn mt-4 hover:bg-cyan-400 hover:text-white hover:font-bold ${
              hasVoted ? "cursor-not-allowed opacity-80" : ""
            }`}
            disabled={hasVoted}
          >
            UpVote <FaThumbsUp className="text-green-500"></FaThumbsUp>
            {votesUp}
          </button>

          {userAddedProduct.reportProduct === "true" ? (
            "Reported"
          ) : (
            <button
              // onClick={() => handleReportProduct()}
              className={`btn ml-4 mt-4 hover:bg-red-400 hover:text-white hover:font-bold`}
            >
              Report <FaReplyAll className="text-red-500"></FaReplyAll>
            </button>
          )}
        </div>
      </section>

      <section>
        <SectionTitle
          heading={"---Product Reviews---"}
          subHeading={ProductName}
        ></SectionTitle>
      </section>
      {/* -----review ----- */}
      <section className="p-4 md:p-16 mx-auto mt-12 lg:mt-8">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-4">
          {review.map((items) => (
            <ProductReviewCard
              key={items._id}
              items={items}
            ></ProductReviewCard>
          ))}
        </div>
      </section>
      {/* ============== */}
      <section>
        <SectionTitle
          subHeading={ProductName}
          heading={"Here you can Post Review "}
        ></SectionTitle>
      </section>
      {/* ------------ */}
      <div className="bg-[#b9dbf8] p-4 md:p-24">
        <h2 className="text-3xl md:text-5xl font-extrabold font-rancho text-[#374151] text-center mb-12">
          Post a review of the Gadget <br />({ProductName})
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
