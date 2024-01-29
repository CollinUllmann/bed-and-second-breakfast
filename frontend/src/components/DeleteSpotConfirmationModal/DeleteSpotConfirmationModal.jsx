
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { thunkFetchDeleteSpot, thunkFetchSpots, } from '../../store/spot';
import './DeleteSpotConfirmationModal.css';

// import * as sessionActions from '../../store/session';
// import './SignupForm.css';

function DeleteSpotConfirmationModal({spotId}) {
  const dispatch = useDispatch()
  const {closeModal} = useModal();

  if (!spotId) {
    return <></>
  }

  const handleDelete = (spotId) => {
    dispatch(thunkFetchDeleteSpot(spotId)).then(() => {
        dispatch(thunkFetchSpots())
        closeModal()
      }
    )
  }

  return (
    <>
      <h1>Confirm Delete</h1>
      <h3>Are you sure you want to delete this spot?</h3>
      <span className="DeleteSpotConfirmationButtonContainer">
        <button className="red" onClick={() => handleDelete(spotId)}>Yes (Delete Spot)</button>
        <button className="grey" onClick={closeModal}>No (Keep Spot)</button>
      </span>
    </>
  );
}

export default DeleteSpotConfirmationModal;
