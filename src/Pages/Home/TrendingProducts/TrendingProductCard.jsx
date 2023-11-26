import { FaThumbsDown, FaThumbsUp } from "react-icons/fa";

const TrendingProductCard = () => {
  return (
    <div>
      <div className="card bg-base-100 shadow-2xl">
        <figure>
          <img className="w-[400px] h-[200px]" src="" alt="Shoes" />
        </figure>
        <div className="card-body" data-aos="fade-up-right">
          <h2 className="card-title text-cyan-400 text-2xl"></h2>
          <p>
            <span className="text-cyan-400 font-bold">Tags: </span>
          </p>
          <p></p>
          <div className="card-actions justify-center">
            <button
            //   onClick={handleUpVote}
            //   className={`btn mt-4 hover:bg-cyan-400 hover:text-white hover:font-bold ${
            //     hasVoted ? "cursor-not-allowed opacity-80" : ""
            //   }`}
            //   disabled={hasVoted}
            >
              UpVote <FaThumbsUp className="text-green-500"></FaThumbsUp>
              {/* {votesUp} */}
            </button>
            <button
            //   onClick={handleDownVote}
            //   className={`btn mt-4 hover:bg-red-400 hover:text-white hover:font-bold ${
            //     hasVoted ? "cursor-not-allowed opacity-80" : ""
            //   }`}
            //   disabled={hasVoted}
            >
              DownVote <FaThumbsDown className="text-red-500"></FaThumbsDown>
              {/* {votesDown} */}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingProductCard;
