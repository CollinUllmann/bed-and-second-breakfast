import { FaStar } from "react-icons/fa6";
import { selectReviewsBySpotId, thunkFetchReviewsBySpotId } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById } from "../../store/users";
import { useEffect } from "react";
import './Reviews.css'


function Reviews({spot}) {
  const dispatch = useDispatch();
  const getReviewsBySpotId = useSelector(selectReviewsBySpotId)
  const getUserById = useSelector(selectUserById)

  const reviews = getReviewsBySpotId(spot.id)

  useEffect(() => {
    dispatch(thunkFetchReviewsBySpotId(spot.id))
  }, [dispatch, spot.id])


  return (
    <>
      <span className="ReviewAvgAndCount">
        <h2><FaStar/>{(isNaN(spot?.avgStarRating) || spot?.avgStarRating == null) ? 'New!' : Number(spot?.avgStarRating).toFixed(1)} </h2>
        {spot?.numReviews && (
          <h2> ·{spot?.numReviews} {spot?.numReviews == 1 ? 'review' : 'reviews'}</h2>
        )}
      </span>
      <button>Post Your Review</button>
      {reviews.map(review => {
        const user = getUserById(review.userId)
        return (
          <div key={review.id}>
            <h2>{user?.firstName}</h2>
            <h4>Month 20##</h4>
            <p>{review.review}</p>
          </div>
        )
      })}
    </>
  );
}

export default Reviews;
