
import { useDispatch } from 'react-redux';
import { thunkFetchDeleteReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';
import { thunkFetchSpotById } from '../../store/spot';

// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

function DeleteConfirmationModal({reviewId, spotId}) {
  const dispatch = useDispatch()
  const {closeModal} = useModal();

  if (!reviewId || !spotId) {
    return <></>
  }

  const handleDelete = (reviewId) => {
    const x = dispatch(thunkFetchDeleteReview(reviewId))
    x.then(() => {
        dispatch(thunkFetchSpotById(spotId))
        closeModal()
      }
    )
  }

  return (
    <>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to delete this review?</h3>
      <span>
        <button onClick={() => handleDelete(reviewId)}>Yes (Delete Review)</button>
        <button onClick={closeModal}>No (Keep Review)</button>
      </span>
    </>
  );
}

export default DeleteConfirmationModal;
