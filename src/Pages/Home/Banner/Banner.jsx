import banner from "../../../assets/Images/banner.png";

const Banner = () => {
  return (
    <div className="relative bg-cover bg-center h-80 md:h-96 lg:h-screen flex items-center justify-center">
      <img
        className="absolute w-full h-full object-cover object-center opacity-90"
        src={banner}
        alt="Banner"
      />

      <div className="absolute bg-slate-900 bg-opacity-40 w-full h-full rounded-md flex flex-col items-center justify-center">
        <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-4 text-white">
          Your Banner Title
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl text-white">
          A clear and visible description of your banner content.
        </p>
      </div>
    </div>
  );
};

export default Banner;
