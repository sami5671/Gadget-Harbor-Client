import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";
import { Link } from "react-router-dom";

const AllAcceptedProductCard = ({ cards }) => {
  // =================================================================
  const { ProductName, ProductPhoto, ProductTag, _id } = cards;
  // =================================================================

  //   ================================================

  //   =================================================================
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
              <h2 className="text-cyan-400 text-xl font-bold">{ProductName}</h2>

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

export default AllAcceptedProductCard;
