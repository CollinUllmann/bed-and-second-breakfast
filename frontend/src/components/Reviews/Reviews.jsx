import { FaStar } from "react-icons/fa6";
import { selectReviewsBySpotId } from "../../store/reviews";
import { useSelector } from "react-redux";
import { selectUserById } from "../../store/users";

function Reviews({spot}) {
  const getReviewsBySpotId = useSelector(selectReviewsBySpotId)
  const getUserById = useSelector(selectUserById)

  const reviews = getReviewsBySpotId(spot?.id)

  console.log(reviews)

  return (
    <>
      <h2><FaStar/>{spot?.avgStarRating.toFixed(1)}  {spot?.numReviews}reviews</h2>
      {reviews.map(review => {
        return (
          <div key={review.id}>
            <h2>{getUserById(review.userId).firstName}</h2>
          </div>
        )
      })}
    </>
  );
}

export default Reviews;
