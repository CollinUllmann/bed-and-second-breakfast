// // import { useEffect, useState } from 'react';
// // import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// // import { Navigate } from 'react-router-dom';
// import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaStar } from "react-icons/fa6";
import './SpotsIndexItem.css';
// import { useEffect } from 'react';
// import { selectSpotsArray, thunkFetchSpots } from '../../store/spot';
// import { Link } from 'react-router-dom';

function SpotsIndexItem({ spot }) {
  // const dispatch = useDispatch();
  // const images = useSelector(getImagesBySpotId(spot.id))

  // useEffect(() => {
  //   dispatch(thunkFetchImages(spot.id))
  // })
  console.log(spot)

  return (
    <>
      <div className='ImageDiv'>
        <img className='PreviewImage' src={spot.previewImage} />
      </div>
      <span className='LocationRatingSpan'>
        <h3 className="SpotCityState">{spot.city}, {spot.state}</h3>
        <h3><FaStar /> {isNaN(spot.avgRating) ? 'New!' : spot.avgRating}</h3>
      </span>
      <h4 className="SpotPrice">${spot.price}/night</h4>
      <Link to={`/spots/${spot.id}`}>Details</Link>

    </>
  );
}

export default SpotsIndexItem;
