// // import { useEffect, useState } from 'react';
// // import * as sessionActions from '../../store/session';
// import { useDispatch, useSelector } from 'react-redux';
// // import { Navigate } from 'react-router-dom';
// import { useEffect } from 'react';
// import { Link } from 'react-router-dom';
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

  return (
    <>
      <div className='ImageDiv'>
        <img className='PreviewImage' src={spot.previewImage} />
      </div>
      <span className='LocationRatingSpan'>
        <div className="SpotCityState">{spot.city}, {spot.state}</div>
        <div className='SpotRating'><FaStar /> {isNaN(spot.avgRating) ? 'New!' : spot.avgRating}</div>
      </span>
      <div className="SpotPrice">${spot.price}/night</div>

    </>
  );
}

export default SpotsIndexItem;
