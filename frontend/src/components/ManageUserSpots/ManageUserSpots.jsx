// import { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './ManageUserSpots.css';
import SpotsIndexItem from '../SpotsIndexItem/SpotsIndexItem';
import { selectSpotsArray, thunkFetchSpots } from '../../store/spot';
// import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import OpenModalButton from '../OpenModalButton';
import DeleteSpotConfirmationModal from '../DeleteSpotConfirmationModal/DeleteSpotConfirmationModal';

function ManageUserSpots() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const sessionUser = useSelector(state => state.session.user);

  const spots = useSelector(selectSpotsArray)


  const userSpots = spots.filter(spot => {
    return spot.ownerId == sessionUser?.id
  })

  useEffect(() => {
    dispatch(thunkFetchSpots())
  }, [dispatch])

  return (
    <>
    <h1>Manage Your Spots</h1>
    {userSpots.length < 1 && 
      <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>    
    }
      <div className='UserSpotsIndexItemContainer' >
        {
          userSpots?.map(spot => {
            return (
              <div key={spot.id} className='UserSpotsIndexItemAndButtonsContainer'>
                <div className='UserSpotsIndexItem' onClick={() => navigate(`/spots/${spot.id}`)}>
                  <SpotsIndexItem spot={spot}></SpotsIndexItem>
                  <div className='ButtonContainer'>
                    <button className="UserSpotsButton" onClick={e => {
                      e.stopPropagation();
                      navigate(`/spots/${spot.id}/edit`)
                    }}>Update</button>
                    <div className="UserSpotsButton">
                      <OpenModalButton
                        buttonText="Delete"
                        modalComponent={<DeleteSpotConfirmationModal spotId={spot?.id}/>}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )
            }
          )
        }
      </div>
      
    </>
  );
}

export default ManageUserSpots;
