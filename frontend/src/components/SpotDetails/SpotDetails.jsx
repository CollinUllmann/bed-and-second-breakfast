import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { selectSpotById, thunkFetchSpot } from "../../store/spot";
import { useEffect } from "react";
import { selectUserById } from "../../store/users";
import { selectSpotImagesBySpotId } from "../../store/spotImages";


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

  

  return (
    <>
      <h2>{spot?.name}</h2>
      <h3>{spot?.city}, {spot?.state}, {spot?.country}</h3>
      <div className="SpotDetailsImageContainer">
        <img className='SpotDetailsPreviewImage' src={previewSpotImage?.url} />
        <div className='SpotDetailsImageGallery'>
          {gallerySpotImages.map(spotImage => {
            return (
              <img key={spotImage.id} src={spotImage.url} alt="" />
            )
          })}
        </div>
      </div>
      <div className="SpotDetailsHostDescription">
        <h2>Hosted by {owner?.firstName} {owner?.lastName}</h2>
        <p>{spot?.description}</p>
      </div>
      <button onClick={()=>alert('Feature Coming Soon!')}>Reserve</button>
    </>
  );
}

export default SpotDetails;
