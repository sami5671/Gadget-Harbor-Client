import { useState } from "react";
import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import ChatbotApp from "../../../Components/Chatbot/ChatbotApp";

const FeaturedProductCard = ({ cards }) => {
  const { ProductName, ProductPhoto, ProductTag, _id } = cards;
  const { user } = useAuth();
  const navigate = useNavigate();

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
        ProductImage: ProductPhoto,
        ProductTags: ProductTag,
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
      <section>
        <Link to={`/product/${_id}`}>
          <div className="bg-base-100 shadow-2xl px-4 py-6 rounded-lg w-[300px] h-[300px]">
            <figure className="flex items-center justify-center">
              <img
                className="w-[200px] h-[150px] px-2"
                src={ProductPhoto}
                alt="Shoes"
              />
            </figure>
            <div className="">
              <h2 className="text-cyan-400 text-2xl">{ProductName}</h2>

              <p>
                <span className="text-cyan-400 font-bold">Tags: </span>
                {ProductTag}
              </p>
              <p></p>
              <div className="">
                <button className="mt-4 border-2 px-3 hover:bg-cyan-400 hover:text-white hover:font-bold">
                  <span className="flex items-center gap-1">
                    UpVote <FaThumbsUp className="text-green-500"></FaThumbsUp>
                  </span>
                </button>

                <button className="ml-2 mt-4 border-2 px-3 hover:bg-red-400 hover:text-white hover:font-bold">
                  <span className="flex items-center gap-1">
                    DownVote
                    <FaThumbsDown className="text-red-500"></FaThumbsDown>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </Link>
      </section>
    </>
  );
};

export default FeaturedProductCard;
