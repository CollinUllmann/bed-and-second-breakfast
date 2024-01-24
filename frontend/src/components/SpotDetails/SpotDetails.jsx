import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSpotById, thunkFetchSpot } from "../../store/spot";
import { useEffect } from "react";
import { selectUserById } from "../../store/users";
import { selectSpotImagesBySpotId } from "../../store/spotImages";
import './SpotDetails.css'
import { FaStar } from "react-icons/fa6";
import Reviews from "../Reviews/Reviews";



function SpotDetails() {
  const dispatch = useDispatch();
  const {spotId} = useParams();

  const getSpotById = useSelector(selectSpotById)
  const getUserById = useSelector(selectUserById)
  const getImagesBySpotId = useSelector(selectSpotImagesBySpotId)

  const spot = getSpotById(spotId);
  const owner = getUserById(spot?.ownerId);
  const spotImages = getImagesBySpotId(spotId)
  const previewSpotImage = spotImages.find(spotImage => spotImage.preview);
  const gallerySpotImages = spotImages.filter(spotImage => !spotImage.preview);

  useEffect(() => {
    dispatch(thunkFetchSpot(spotId))
  }, [spotId, dispatch])

  // const cols = 2;

  // const columnDivs = [];

  const gallerySpotImageElements = gallerySpotImages.map(spotImage => {
    return (
      <div key={spotImage.id} className="SpotImageGalleryCell">
        <img  src={spotImage.url} className="SpotImageGalleryImage"/>
      </div>
    )
  })
  
  // const gallerySpotImageElementsByColIndex = gallerySpotImageElements.reduce((acc, imageElement, currentIndex) => {
  //   const colIndex = currentIndex % cols;
  //   if (!acc[colIndex]) {
  //     acc[colIndex] = []
  //   }
  //   acc[colIndex].push(imageElement)
  //   return acc
  // }, {})

  // for (let i = 0; i < cols; i++) {
  //   columnDivs.push(
  //     <div key={i} className="SpotImageGalleryColDiv">
  //       {gallerySpotImageElementsByColIndex[i]}
  //     </div>
  //   )
  // }

  const rows = 2
  const imagePositionMapping = {};
  for (let i = 0; i < gallerySpotImageElements.length; i++) {
    const colPosition = Math.floor(i / rows) + 1
    const rowPosition = (i % rows) + 1
    imagePositionMapping[i] = [rowPosition, colPosition]
  }
  console.log(imagePositionMapping)
  


  console.log(gallerySpotImages)

  return (
    <>
      <h2>{spot?.name}</h2>
      <h3>{spot?.city}, {spot?.state}, {spot?.country}</h3>
      <div className="SpotDetailsImageContainer">
        <div className="SpotDetailsPreviewCell">
          <img className='SpotDetailsPreviewImage' src={previewSpotImage?.url} />
        </div>
        <div className='SpotDetailsImageGallery'>
          {/* {columnDivs} */}
          {gallerySpotImages.map((spotImage, index) => {
            return (
              <div key={spotImage.id} className="SpotImageGalleryCell" style={{'grid-area': `${imagePositionMapping[index][0]} / ${imagePositionMapping[index][1]} / ${imagePositionMapping[index][0]} / ${imagePositionMapping[index][1]}`}}>
                <img  src={spotImage.url} className="SpotImageGalleryImage"/>
              </div>
            )
          })}
        </div>
      </div>
      <div className="SpotDetailsDescriptionAndReservationContainer">
        <div className="SpotDetailsHostDescription">
          <h2>Hosted by {owner?.firstName} {owner?.lastName}</h2>
          <p>{spot?.description}</p>
        </div>
        <div className="SpotDetailsReservationContainer">
          <span className="SpotDetailsPriceRatingSpan">
            <h2>${spot?.price}night</h2>
            <h3><FaStar /> {isNaN(spot?.avgStarRating) ? 'New!' : spot.avgStarRating.toFixed(1)}</h3>
          </span>
          <button onClick={()=>alert('Feature Coming Soon!')}>Reserve</button>
        </div>
      </div>
      <Reviews spot={spot}/>
    </>
  );
}

export default SpotDetails;
