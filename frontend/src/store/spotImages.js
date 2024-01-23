// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";


//action types
const LOAD_SPOT_IMAGES = 'spot/LOAD_SPOT_IMAGES'


//action creators
export const loadSpotImages = (spotImages) => ({
  type: LOAD_SPOT_IMAGES,
  spotImages
})

//thunks


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
    default:
      return state;
  }
}

export default spotImagesReducer;
