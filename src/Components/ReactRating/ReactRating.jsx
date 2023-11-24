import { useState } from "react";
import Rating from "react-rating";

const ReactRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (event) => {
    setRating(event);
    onRatingChange(event);
  };
  return (
    <div>
      <p>Your Rating: {rating}</p>
      <Rating
        initialRating={rating}
        emptySymbol="far fa-star"
        fullSymbol="fas fa-star"
        onChange={handleRating}
      />
    </div>
  );
};

export default ReactRating;
