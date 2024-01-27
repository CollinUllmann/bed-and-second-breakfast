// import { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './SpotsIndex.css';
import SpotsIndexItem from '../SpotsIndexItem/SpotsIndexItem';
import { selectSpotsArray, thunkFetchSpots } from '../../store/spot';
import { useNavigate } from 'react-router-dom';

function SpotsIndex() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const spots = useSelector(selectSpotsArray)

  useEffect(() => {
    dispatch(thunkFetchSpots())
  }, [dispatch])

  return (
    <>
      <div className='SpotsIndexItemContainer'>

        {
          spots?.map(spot => {
            return (
              <>
                {/* <div className='tooltip'>
                    <span className='tooltiptext'>{spot.name}</span>
                </div> */}
                <div className='SpotsIndexItem tooltip' key={spot.id} onClick={() => navigate(`/spots/${spot.id}`)}>
                  <span className='tooltiptext'>{spot.name}</span>
                  <SpotsIndexItem spot={spot} ></SpotsIndexItem>
                </div>
              </>
            )
            }
          )
        }
      </div>
    </>
  );
}

export default SpotsIndex;
