import { useState } from "react"
import { useDispatch } from "react-redux"
import { thunkFetchCreateSpot } from "../../store/spot";

function CreateNewSpotFormPage() {
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
  const [images, setImages] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault();
    const newSpot = {
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
    console.log('spot being sent into thunkFetchCreateSpot: ', newSpot)
    dispatch(thunkFetchCreateSpot(newSpot))

    // setAddress('')
    // setCountry('')
    // setCity('')
    // setState('')
    // setLat('')
    // setLng('')
    // setDescription('')
    // setTitle('')
    // setPrice('')
    // setPreviewImage('')
    // setImages([])
  }


  return (
    <>
      <h1>Create a new Spot</h1>
      <form onSubmit={handleSubmit}>
      <h2>Wheres your place located?</h2>
      <h4>Guests will only get your exact address once they booked a reservation</h4>
      <label>
        Country
        <input
          type='text'
          value={country}
          placeholder="Country"
          onChange={(e) => setCountry(e.target.value)}
          name='locationCountry'
          required
        />
      </label>
      <label>
        Street Address
        <input
          type='text'
          value={address}
          placeholder="Street Address"
          onChange={(e) => setAddress(e.target.value)}
          name='streetAddress'
          required
        />
      </label>
      <label>
        City
        <input
          type='text'
          value={city}
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          name='city'
          required
        />
      </label>
      <label>
        State
        <input
          type='text'
          value={state}
          placeholder="State"
          onChange={(e) => setState(e.target.value)}
          name='state'
          required
        />
      </label>
      <label>
        Latitude
        <input
          type='text'
          value={lat}
          placeholder="Latitude"
          onChange={(e) => setLat(e.target.value)}
          name='latitude'
          required
        />
      </label>
      <label>
        Longitude
        <input
          type='text'
          value={lng}
          placeholder="Longitude"
          onChange={(e) => setLng(e.target.value)}
          name='longitude'
          required
        />
      </label>
      <h2>Describe your place to guests</h2>
      <p>Mention the best features of your space, any special amenities like fast wifi or parking, and what you love about the neighborhood.</p>       
        <textarea
          value={description}
          placeholder="Please write at least 30 characters"
          onChange={(e) => setDescription(e.target.value)}
          name='description'
          required
        />
      <h2>Create a title for your spot</h2>
      <p>Catch guests attention with a spot title that highlights what makes your place special.</p>       
        <input
          type='text'
          value={title}
          placeholder="Name of your spot"
          onChange={(e) => setTitle(e.target.value)}
          required
          name='title'
        />
      <h2>Set a base price for your spot</h2>
      <p>Competitive pricing can help your listing stand out and rank higher in search results</p>
      <label>
        $
        <input
          type='text'
          value={price}
          placeholder="Price per night (USD)"
          onChange={(e) => setPrice(e.target.value)}
          name='price'
          required
        />
      </label>   
      <h2>Liven up your spot with photos</h2>
      <p>Submit a link to at least one photo to publish your spot</p>       
        <input
          type='text'
          value={previewImage}
          placeholder="Preview Image URL"
          onChange={(e) => setPreviewImage(e.target.value)}
          name='previewImage'
          required
        />  
        <input
          type='text'
          value={images}
          placeholder="Image URL"
          onChange={(e) => setImages(e.target.value)}
          name='image1'

        />  
        <input
          type='text'
          value={images}
          placeholder="Image URL"
          onChange={(e) => setImages(e.target.value)}
          name='image2'

        />  
        <input
          type='text'
          value={images}
          placeholder="Image URL"
          onChange={(e) => setImages(e.target.value)}
          name='image3'

        />  
      <button type='submit'>Submit</button>
      </form>
      
    
    </>
  )
}

export default CreateNewSpotFormPage