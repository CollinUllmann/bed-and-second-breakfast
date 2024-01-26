// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


//action types
const LOAD_SPOT_IMAGES = 'spotImage/LOAD_SPOT_IMAGES'
const DELETE_SPOT_IMAGE = 'spotImage/DELETE_SPOT_IMAGE'


//action creators
export const loadSpotImages = (spotImages) => ({
  type: LOAD_SPOT_IMAGES,
  spotImages
})

export const deleteSpotImage = (imageId) => ({
  type: DELETE_SPOT_IMAGE,
  imageId
})


//thunks
export const thunkFetchCreateSpotImage = (spotId, url, preview) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/images`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      url,
      preview
    })
  });
  if (res.ok) {
    const newSpotImage = await res.json();
    dispatch(loadSpotImages([newSpotImage]))
    return null
  }
  return null
}

export const thunkFetchDeleteSpotImage = (imageId) => async (dispatch) => {
  await csrfFetch(`/api/spot-images/${imageId}`, {
    method: 'DELETE'
  })
  dispatch(deleteSpotImage(imageId))
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
    case DELETE_SPOT_IMAGE: {
      const spotImageState = { ...state };
      delete spotImageState[action.imageId]
      return spotImageState
    }
    default:
      return state;
  }
}

export default spotImagesReducer;
