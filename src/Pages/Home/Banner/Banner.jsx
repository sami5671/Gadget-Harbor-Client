import banner from "../../../assets/Images/banner.png";

const Banner = () => {
  return (
    <div className="relative bg-cover bg-center h-80 md:h-96 lg:h-screen flex items-center justify-center">
      <img
        className="absolute w-full h-full object-cover object-center opacity-90"
        src={banner}
        alt="Banner"
      />

      <div className="absolute bg-slate-900 bg-opacity-60 w-full h-full rounded-md flex flex-col items-center justify-center">
        <div className="text-center lg:px-44">
          <h2 className="text-2xl lg:text-7xl mt-12 font-bold mb-4 text-white">
            Discover, Share, and Experience the Latest in Tech!
          </h2>
          <p className="text-base sm:text-lg px-2 md:text-xl lg:text-2xl text-white">
            Join our community to submit new products, vote on existing ones,
            share your reviews, and unlock premium features with our integrated
            payment system.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
