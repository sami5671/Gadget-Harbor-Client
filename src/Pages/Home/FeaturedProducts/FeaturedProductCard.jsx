import { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
// import Swal from "sweetalert2";

const FeaturedProductCard = ({ cards }) => {
  const { name, image, tag, _id } = cards;
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  //   ================================================

  const [votesUp, setVotesUp] = useState(0);
  const [votesDown, setVotesDown] = useState(0);
  const [hasVoted, setHasVoted] = useState(false);

  const handleUpVote = (_id) => {
    if (user && !hasVoted) {
      setVotesUp(votesUp + 1);
      setHasVoted(true);
      //send data to the server
      const featuredProduct = {
        name,
        ProductImage: image,
        ProductTags: tag,
        ProductCardId: _id,
        votes: votesUp,
      };
      console.log(featuredProduct);

      // axiosPublic
      //   .patch(`/featuredProducts/${_id}`, featuredProduct)
      //   .then((res) => {
      //     if (res.data.modifiedCount > 0) {
      //       console.log(res.data.modifiedCount);
      //       Swal.fire("Your Response has been saved successfully");
      //     }
      //   })
      //   .catch((error) => {
      //     console.error("Error:", error);
      //     // Handle error here, for example, show an error message to the user
      //     Swal.fire({
      //       title: "Error!",
      //       text: "An error occurred while updating the featured product",
      //       icon: "error",
      //       confirmButtonText: "OK",
      //     });
      //   });
    } else {
      navigate("/login");
    }
  };
  const handleDownVote = () => {
    if (user && !hasVoted) {
      setVotesDown(votesDown + 1);
      setHasVoted(true);
    } else {
      navigate("/login");
    }
  };

  // ===================================================
  return (
    <>
      <div className="card bg-base-100 shadow-2xl">
        <figure>
          <img className="w-[400px] h-[200px]" src={image} alt="Shoes" />
        </figure>
        <div className="card-body" data-aos="fade-up-right">
          <Link to={`/product/${_id}`}>
            <h2 className="card-title text-cyan-400 text-2xl">{name}</h2>
          </Link>
          <p>
            <span className="text-cyan-400 font-bold">Tags: </span>
            {tag}
          </p>
          <p></p>
          <div className="card-actions justify-center">
            <button
              onClick={() => handleUpVote(_id)}
              className={`btn mt-4 hover:bg-cyan-400 hover:text-white hover:font-bold ${
                hasVoted ? "cursor-not-allowed opacity-80" : ""
              }`}
              disabled={hasVoted}
            >
              UpVote <FaThumbsUp className="text-green-500"></FaThumbsUp>
              {votesUp}
            </button>
            <button
              onClick={handleDownVote}
              className={`btn mt-4 hover:bg-red-400 hover:text-white hover:font-bold ${
                hasVoted ? "cursor-not-allowed opacity-80" : ""
              }`}
              disabled={hasVoted}
            >
              DownVote <FaThumbsDown className="text-red-500"></FaThumbsDown>
              {votesDown}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProductCard;
