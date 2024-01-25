
import { useDispatch } from 'react-redux';
import { thunkFetchDeleteReview } from '../../store/reviews';
import { useModal } from '../../context/Modal';

// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

function DeleteConfirmationModal({reviewId}) {
  const dispatch = useDispatch()
  const {closeModal} = useModal();

  const handleDelete = (reviewId) => {
    dispatch(thunkFetchDeleteReview(reviewId))
    closeModal()
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
