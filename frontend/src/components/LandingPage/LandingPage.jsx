// import { useEffect, useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
// import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import './LandingPage.css';
import { selectSpotsArray, thunkFetchSpots } from '../../store/spot';
import { Link } from 'react-router-dom';

function LandingPage() {
  const dispatch = useDispatch();

  const spots = useSelector(selectSpotsArray)
  console.log('spots: ', spots )

  useEffect(() => {
    dispatch(thunkFetchSpots())
  }, [dispatch])

  return (
    <>
      <h1>Welcome to the Landing Page</h1>
      <ul>
        {
          spots?.map(spot => {
            return (
              <li key={spot.id}><Link to={`/api/spots/${spot.id}`}>{spot.name}</Link></li>
            )
            }
          )
        }

      </ul>
      
    </>
  );
}

export default LandingPage;
