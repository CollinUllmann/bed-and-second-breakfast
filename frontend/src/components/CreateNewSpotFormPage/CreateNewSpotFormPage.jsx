import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { thunkFetchCreateSpot, thunkFetchSpotById, thunkFetchUpdateSpot } from "../../store/spot";
import { thunkFetchCreateSpotImage, thunkFetchDeleteSpotImage } from "../../store/spotImages";
import { useNavigate, useParams } from "react-router-dom";
import './CreateNewSpotFormPage.css'

function CreateNewSpotFormPage() {
  const { spotId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [country, setCountry] = useState('')
  const [address, setAddress] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [description, setDescription] = useState('')
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [previewImage, setPreviewImage] = useState('')
  const [image1, setImage1] = useState('')
  const [image2, setImage2] = useState('')
  const [image3, setImage3] = useState('')
  const [image4, setImage4] = useState('')
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [validationErrors, setValidationErrors] = useState({})

  useEffect(() => {
    if(spotId) {
      dispatch(thunkFetchSpotById(spotId)).then((oldSpot) => {
        setCountry(oldSpot.country)
        setAddress(oldSpot.address)
        setCity(oldSpot.city)
        setState(oldSpot.state)
        setLat(oldSpot.lat)
        setLng(oldSpot.lng)
        setDescription(oldSpot.description)
        setTitle(oldSpot.name)
        setPrice(oldSpot.price)
        setPreviewImage(oldSpot.SpotImages.find(image => {
          return image.preview
        })?.url ?? '')
        const gallerySpotImages = oldSpot.SpotImages.filter(image => {
          return !image.preview
        })
        console.log('gallerySpotImages: ', gallerySpotImages)
        setImage1(gallerySpotImages[0]?.url ?? '')
        setImage2(gallerySpotImages[1]?.url ?? '')
        setImage3(gallerySpotImages[2]?.url ?? '')
        setImage4(gallerySpotImages[3]?.url ?? '')
      }
      )
    }
  }, [spotId, dispatch])



  const handleSubmit = (e) => {
    e.preventDefault();

    setHasSubmitted(true)
    if (Object.keys(validationErrors).length > 0) {
      console.log(hasSubmitted)
      console.log(validationErrors)
      return null
    }

    if(spotId) {
      let updatedSpot = {
        address,
        city,
        state,
        country,
        lat,
        lng,
        description,
        name: title,
        price
      }
  
      let images = [image1, image2, image3, image4]
      dispatch(thunkFetchSpotById(spotId)).then((responseSpot) => {
        const spotImagesToDelete = responseSpot.SpotImages
        Promise.all(spotImagesToDelete.map(spotImage => dispatch(thunkFetchDeleteSpotImage(spotImage.id)))).then(
          () => {
            dispatch(thunkFetchUpdateSpot(spotId, updatedSpot)).then(responseSpot => {
              const promises = [];
              promises.push(dispatch(thunkFetchCreateSpotImage(responseSpot.id, previewImage, true))) //the true indicates that it's a preview image which should be in the body of the post request
              images.forEach(imageUrl => {
                promises.push(dispatch(thunkFetchCreateSpotImage(responseSpot.id, imageUrl, false)))
              })
              Promise.all(promises).then(() => navigate(`/spots/${responseSpot.id}`))
            })
          }
        )
      })
    } else {

      let optionalLat = lat.length > 0 ? lat : '0'
      let optionalLng = lng.length > 0 ? lng : '0'
  
      let newSpot = {
        address,
        city,
        state,
        country,
        lat: optionalLat,
        lng: optionalLng,
        description,
        name: title,
        price
      }
  
      let images = [image1, image2, image3, image4]
      dispatch(thunkFetchCreateSpot(newSpot)).then(responseSpot => {
        const promises = [];
        promises.push(dispatch(thunkFetchCreateSpotImage(responseSpot.id, previewImage, true))) //the true indicates that it's a preview image which should be in the body of the post request
        images.forEach(imageUrl => {
          promises.push(dispatch(thunkFetchCreateSpotImage(responseSpot.id, imageUrl, false)))
        })
        Promise.all(promises).then(() => navigate(`/spots/${responseSpot.id}`))
      })
    }
    

    setAddress('')
    setCountry('')
    setCity('')
    setState('')
    setLat('')
    setLng('')
    setDescription('')
    setTitle('')
    setPrice('')
    setPreviewImage('')
    setImage1('')
    setImage2('')
    setImage3('')
    setImage4('')
    setHasSubmitted(false)


  }

  useEffect(() => {
    let errors = {}
    if (country.length <= 0) errors.country = 'Country is required'
    if (address.length <= 0) errors.address = 'Address is required'
    if (city.length <= 0) errors.city = 'City is required'
    if (state.length <= 0) errors.state = 'State is required'
    if (description.length < 30) errors.description = 'Description needs a minimum of 30 characters'
    if (title.length <= 0) errors.title = 'Name is required'

    if (price.length <= 0) {
      errors.price = 'Price is required'
    } else {
      const priceNumber = Number(price);
      if(isNaN(priceNumber)) errors.price = 'Price must be a number';
      else if(priceNumber < 0) errors.price = 'Price must not be negative';
    }

    if (lat != null && lat !== '') {
      const latNumber = Number(lat);
      if(isNaN(latNumber)) errors.lat = 'Latitude must be a number';
      else if(latNumber < -90 || latNumber > 90) errors.lat = 'Latitude must be between -90 and 90';
    }

    if (lng != null && lng !== '') {
      const lngNumber = Number(lng);
      if(isNaN(lngNumber)) errors.lng = 'Longitude must be a number';
      else if(lngNumber < -180 || lngNumber > 180) errors.lng = 'Longitude must be between -180 and 180';
    }

    if (!previewImage.length > 0) errors.previewImage = 'Preview image is required'
    if (!imageFileTypeValidation(previewImage)) errors.previewImage = 'Image URL needs to end in png or jpg (or jpeg)'
    if (!imageFileTypeValidation(image1)) errors.image1 = 'Image URL needs to end in png or jpg (or jpeg)'
    if (!imageFileTypeValidation(image2)) errors.image2 = 'Image URL needs to end in png or jpg (or jpeg)'
    if (!imageFileTypeValidation(image3)) errors.image3 = 'Image URL needs to end in png or jpg (or jpeg)'

    setValidationErrors(errors)
  }, [country, address, city, state, lat, lng, description, title, price, previewImage, image1, image2, image3])

  function imageFileTypeValidation(imageUrl) {
    if (imageUrl.length < 1) return true
    if (imageUrl.endsWith('jpg')) return true;
    if (imageUrl.endsWith('jpeg')) return true;
    if (imageUrl.endsWith('png')) return true;
    return false
  }


  return (
    <div className="CreateSpotFormContainer">
      <form onSubmit={handleSubmit} className="CreateSpotForm">
      <h1 id="CreateSpotFormTitle">{ spotId ? 'Update your Spot' : 'Create a New Spot' }</h1>
      <div className="CreateSpotFormDiv">
        <h2>Where's your place located?</h2>
        <div className="CreateSpotFormInputDescription">Guests will only get your exact address once they booked a reservation</div>
        <div className="CreateSpotInputSection">
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <label>Country{hasSubmitted && validationErrors.country && 
                <span className="error">{validationErrors.country}</span>
              }</label>
              <input
                className="CreateSpotInput"
                type='text'
                value={country}
                placeholder="Country"
                onChange={(e) => setCountry(e.target.value)}
                name='locationCountry'
                required
              />
            </div>
          </div>
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <label>Street Address{hasSubmitted && validationErrors.address && 
                <span className="error">{validationErrors.address}</span>
              }</label>
              <input
                className="CreateSpotInput"

                type='text'
                value={address}
                placeholder="Street Address"
                onChange={(e) => setAddress(e.target.value)}
                name='streetAddress'
                required
              />
            </div>
          </div>
          <div id="CreateSpotCityStateDiv" className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <label>City{hasSubmitted && validationErrors.city && 
                <span className="error">{validationErrors.city}</span>
              }</label>
              <input
                className="CreateSpotInput"
                type='text'
                value={city}
                placeholder="City"
                onChange={(e) => setCity(e.target.value)}
                name='city'
                required
              />
            </div>
            <div className="CreateSpotSeparationComma"> , </div>
            <div id="CreateSpotLabeledStateInput" className="CreateSpotLabeledInput">
              <label>State{hasSubmitted && validationErrors.state && 
                <span className="error">{validationErrors.state}</span>
              }</label>
              <input
                className="CreateSpotInput"
                type='text'
                value={state}
                placeholder="State"
                onChange={(e) => setState(e.target.value)}
                name='state'
                required
              />
            </div>
          </div>
          <div id="CreateSpotLatLngDiv" className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <label>Latitude{hasSubmitted && validationErrors.lat && 
                <span className="error">{validationErrors.lat}</span>
              }</label>
              <input
                className="CreateSpotInput"
                type='text'
                value={lat}
                placeholder="Latitude"
                onChange={(e) => setLat(e.target.value)}
                name='latitude'
              />
            </div>
            
            <div className="CreateSpotSeparationComma"> , </div>

            <div className="CreateSpotLabeledInput">
              <label>Longitude{hasSubmitted && validationErrors.lng && 
                <span className="error">{validationErrors.lng}</span>
              }</label>
              <input
                className="CreateSpotInput"
                type='text'
                value={lng}
                placeholder="Longitude"
                onChange={(e) => setLng(e.target.value)}
                name='longitude'
              />
            </div>
            
          </div> 
        </div> 
      </div>
      <div className="HrDiv">
        <hr className="CreateSpotPageBreak"/>
      </div>
      <div className="CreateSpotFormDiv">
        <h2>Describe your place to guests</h2>
        <p className="CreateSpotFormInputDescription">Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>       
        <div className="CreateSpotInputSection">
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <textarea
                className="CreateSpotInput"
                rows='6'
                value={description}
                placeholder="Please write at least 30 characters"
                onChange={(e) => setDescription(e.target.value)}
                name='description'
                required
              />
              {hasSubmitted && validationErrors.description && 
                <span className="error">{validationErrors.description}</span>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="HrDiv">
        <hr className="CreateSpotPageBreak"/>
      </div>
      <div className="CreateSpotFormDiv">
        <h2>Create a title for your spot</h2>
        <p className="CreateSpotFormInputDescription">Catch guests attention with a spot title that highlights what makes your place special.</p>
        <div className="CreateSpotInputSection">
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <input
                className="CreateSpotInput"
                type='text'
                value={title}
                placeholder="Name of your spot"
                onChange={(e) => setTitle(e.target.value)}
                required
                name='title'
              />
              {hasSubmitted && validationErrors.title && 
                <span className="error">{validationErrors.title}</span>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="HrDiv">
        <hr className="CreateSpotPageBreak"/>
      </div>
      <div className="CreateSpotFormDiv">
        <h2>Set a base price for your spot</h2>
        <p className="CreateSpotFormInputDescription">Competitive pricing can help your listing stand out and rank higher in search results</p>
        <div className="CreateSpotInputSection">
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <div className="CreateSpotCurrencySymbolPrice">
                <span>$</span>
                <input
                  id="CreateSpotPricePerNightInput"
                  className="CreateSpotInput"
                  type='text'
                  value={price}
                  placeholder="Price per night (USD)"
                  onChange={(e) => setPrice(e.target.value)}
                  name='price'
                  required
                />
              </div>
              {hasSubmitted && validationErrors.price && 
                <span className="error">{validationErrors.price}</span>
              }
            </div>
          </div>
        </div>
      </div>
      <div className="HrDiv">
        <hr className="CreateSpotPageBreak"/>
      </div>
      <div className="CreateSpotFormDiv">
        <h2>Liven up your spot with photos</h2>
        <p className="CreateSpotFormInputDescription">Submit a link to at least one photo to publish your spot</p> 
        <div className="CreateSpotInputSection">
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">      
              <input
                className="CreateSpotInput"
                type='text'
                value={previewImage}
                placeholder="Preview Image URL"
                onChange={(e) => setPreviewImage(e.target.value)}
                name='previewImage'
                required
              />  
              {hasSubmitted && validationErrors.previewImage && 
                <span className="error">{validationErrors.previewImage}</span>
              }
            </div>
          </div>
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">   
              <input
                className="CreateSpotInput"
                type='text'
                value={image1}
                placeholder="Image URL"
                onChange={(e) => setImage1(e.target.value)}
                name='image1'
              />  
              {hasSubmitted && validationErrors.image1 && 
                <span className="error">{validationErrors.image1}</span>
              }
            </div>
          </div>
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <input
                className="CreateSpotInput"
                type='text'
                value={image2}
                placeholder="Image URL"
                onChange={(e) => setImage2(e.target.value)}
                name='image2'

              />
              {hasSubmitted && validationErrors.image2 && 
                <span className="error">{validationErrors.image2}</span>
              }
            </div>
          </div>
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <input
                className="CreateSpotInput"
                type='text'
                value={image3}
                placeholder="Image URL"
                onChange={(e) => setImage3(e.target.value)}
                name='image3'

              />  
              {hasSubmitted && validationErrors.image3 && 
                <span className="error">{validationErrors.image3}</span>
              }
            </div>
          </div>
          <div className="CreateSpotRow">
            <div className="CreateSpotLabeledInput">
              <input
                className="CreateSpotInput"
                type='text'
                value={image4}
                placeholder="Image URL"
                onChange={(e) => setImage4(e.target.value)}
                name='image4'

              />  
              {hasSubmitted && validationErrors.image4 && 
                <span className="error">{validationErrors.image4}</span>
              }
            </div>
          </div>
        </div>
      </div>
      <div id="CreateSpotSubmitButton" onClick={handleSubmit}>Create Spot</div>
      </form>
    </div>
  )
}

export default CreateNewSpotFormPage