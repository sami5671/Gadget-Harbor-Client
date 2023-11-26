const ProductReviewCard = ({ items }) => {
  // =================================================================
  const { ReviewerName, ReviewerPhoto, ReviewerDescription, ReviewerRating } =
    items;
  // =================================================================
  return (
    <>
      <div className="max-w-sm mx-auto bg-white rounded-md overflow-hidden shadow-lg flex py-6">
        <img
          className="w-16 h-16 object-cover object-center rounded-full"
          src={ReviewerPhoto}
          alt="img"
        />
        <div className="flex flex-col justify-center ml-4">
          <div className="font-bold text-xl mb-2">{ReviewerName}</div>
          <p className="text-gray-700 text-base">{ReviewerDescription}</p>
          <div className="flex mt-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              {ReviewerRating} Stars
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              Verified Buyer
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductReviewCard;
