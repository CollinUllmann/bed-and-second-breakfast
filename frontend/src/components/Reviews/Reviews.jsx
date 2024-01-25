import { FaStar } from "react-icons/fa6";
import { selectReviewsBySpotId, thunkFetchReviewsBySpotId } from "../../store/reviews";
import { useDispatch, useSelector } from "react-redux";
import { selectUserById } from "../../store/users";
import { useEffect } from "react";
import './Reviews.css'
import ReviewFormModal from "../ReviewFormModal/ReviewFormModal";
import OpenModalButton from '../OpenModalButton';
import DeleteConfirmationModal from "../DeleteConfirmationModal";



function Reviews({spot}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const getReviewsBySpotId = useSelector(selectReviewsBySpotId)
  const getUserById = useSelector(selectUserById)

  let reviews = getReviewsBySpotId(spot.id)
  reviews = reviews.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
  })

  useEffect(() => {
    dispatch(thunkFetchReviewsBySpotId(spot.id))
  }, [dispatch, spot.id])

 

  const includesCurrentUserReview = reviews.find(review => {
    return review.userId == sessionUser?.id ? true : false
  })

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <>
      <span className="ReviewAvgAndCount">
        <h2><FaStar/>{(isNaN(spot?.avgStarRating) || spot?.avgStarRating == null) ? 'New!' : Number(spot?.avgStarRating).toFixed(1)} </h2>
        {spot?.numReviews && (
          <h2> ·{spot?.numReviews} {spot?.numReviews == 1 ? 'review' : 'reviews'}</h2>
        )}
      </span>
      {sessionUser && !(sessionUser?.id == spot.ownerId) && !includesCurrentUserReview && 
        <OpenModalButton
              buttonText="Leave your review here..."
              modalComponent={<ReviewFormModal spot={spot}/>}
            />
      }
      {reviews.map(review => {
        const user = getUserById(review.userId)
        let date = Date.parse(review.createdAt)
        date = new Date(date)
        let month = months[date.getMonth()]
        let year = date.getFullYear()
        return (
          <div key={review.id}>
            <h2>{user?.firstName}</h2>
            <h3>{month} {year}</h3>
            <p>{review.review}</p>
            {sessionUser.id == review.userId && 
            <OpenModalButton
            buttonText="Delete"
            modalComponent={<DeleteConfirmationModal reviewId={review.id}/>}
          />
            }
          </div>
        )
      })}
    </>
  );
}

export default Reviews;
