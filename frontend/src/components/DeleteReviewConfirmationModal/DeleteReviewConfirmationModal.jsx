
import { useDispatch } from 'react-redux';
import { thunkFetchDeleteReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import { thunkFetchSpotById } from '../../store/spot';
import './DeleteReviewConfirmationModal.css'

// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

function DeleteReviewConfirmationModal({reviewId, spotId}) {
  const dispatch = useDispatch()
  const {closeModal} = useModal();

  if (!reviewId || !spotId) {
    return <></>
  }

  const handleDelete = (reviewId) => {
    dispatch(thunkFetchDeleteReview(reviewId)).then(() => {
        dispatch(thunkFetchSpotById(spotId))
        closeModal()
      }
    )
  }

  return (
    <>
      <h1>Confirm Delete</h1>
      <h3 className="AreYouSure">Are you sure you want to delete this review?</h3>
      <span>
        <button onClick={() => handleDelete(reviewId)}>Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
      </span>
    </>
  );
}

export default DeleteReviewConfirmationModal;
