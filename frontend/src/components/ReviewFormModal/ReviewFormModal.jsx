import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkFetchCreateReview } from '../../store/reviews';
import { FaStar } from "react-icons/fa6";
import './ReviewFormModal.css'

// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

function ReviewFormModal({spot}) {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);

  const [review, setReview] = useState('')
  const [errors, setErrors] = useState({});
  const [activeRating, setActiveRating] = useState(0)
  const [rating, setRating] = useState(0)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const { closeModal } = useModal();

  useEffect(() => {
    review.length < 10 ? setErrors({...errors, review: 'Review must be at least 10 characters'}) : delete errors.review
  }, [review, errors])

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true)
    setErrors({});
    const newReview = {
      spotId: spot.id,
      userId: sessionUser.id,
      review,
      stars: rating
    }

    console.log('review going into thunk', newReview)

    return dispatch(thunkFetchCreateReview(spot.id, newReview))
      .then(errors => {
        if (errors) {
          setErrors(errors);
        } else {
          closeModal()
        }
      });
  };

  const numList = [1, 2, 3, 4, 5]


  return (
    <>
      <h1>How was your stay?</h1>
      {hasSubmitted && Object.keys(errors).length > 0 && (
        <div>{errors.review}</div>

      )}
      <form className='ReviewForm' onSubmit={handleSubmit}>
        <textarea
        placeholder='Leave your review here...'
        value={review}
        onChange={(e) => setReview(e.target.value)}
        name='review'
        />
        <div className="rating-input">
        {numList.map(num => {
          return (
            <div
            key={num} 
            className={activeRating > num - 1 ? 'filled' : 'empty'}
            onMouseEnter={() => setActiveRating(num)}
            onMouseLeave={() => setActiveRating(rating)}
            onClick={() => setRating(num)}
            >
            <FaStar/>  
          
        </div>
          )
        })}
        <h4>Stars</h4>
    </div>
        <button disabled={Object.keys(errors).length > 0 || rating < 1}>Submit Your Review</button>
      </form>
    </>
  );
}

export default ReviewFormModal;
