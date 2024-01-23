// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


//action types
const LOAD_SPOT_IMAGES = 'spot/LOAD_SPOT_IMAGES'
const ADD_SPOT_IMAGE = 'spot/ADD_SPOT_IMAGES'


//action creators
export const loadSpotImages = (spotImages) => ({
  type: LOAD_SPOT_IMAGES,
  spotImages
})

export const addSpotImage = (spotImage) => ({
  type: ADD_SPOT_IMAGE,
  spotImage
})

//thunks
export const thunkFetchCreateSpotImage = (spotId, url, preview) => async (dispatch) => {
  const res = await csrfFetch('/api/spots/:spotId/images', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      spotId,
      url,
      preview
    }
  });
  if (res.ok) {
    console.log('response successfully received')
    const newSpotImage = await res.json();
    dispatch(addSpotImage(newSpotImage))
    return null
  }
  return null
}


//selectors

export const selectSpotImages = state => state.spotImages

export const selectSpotImagesBySpotId = createSelector(
  selectSpotImages,
  entries => (spotId) => {
    let entriesArr = Object.values(entries).filter(spotImage => {
      return spotImage.spotId == spotId
    })
    return entriesArr
  }
)


//reducer
let initialState = {}
function spotImagesReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SPOT_IMAGES: {
      const spotImageState = { ...state };
      action.spotImages.forEach((spotImage) => {
        spotImageState[spotImage.id] = spotImage
      })
      return spotImageState
    }
    case ADD_SPOT_IMAGE: {
      const spotImageState = { ...state };
      console.log(spotImageState)
      return state
    }
    default:
      return state;
  }
}

export default spotImagesReducer;
