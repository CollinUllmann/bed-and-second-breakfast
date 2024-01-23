// import { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './SpotsIndex.css';
import SpotsIndexItem from '../SpotsIndexItem/SpotsIndexItem';
import { selectSpotsArray, thunkFetchSpots } from '../../store/spot';

function SpotsIndex() {
  const dispatch = useDispatch();

  const spots = useSelector(selectSpotsArray)
  console.log('spots in store: ', spots)

  useEffect(() => {
    dispatch(thunkFetchSpots())
  }, [dispatch])

  return (
    <>
      <div className='SpotsIndexItemContainer'>

        {
          spots?.map(spot => {
            return (
              <div className='SpotsIndexItem' key={spot.id}><SpotsIndexItem spot={spot}></SpotsIndexItem></div>
            )
            }
          )
        }
      </div>
    </>
  );
}

export default SpotsIndex;
