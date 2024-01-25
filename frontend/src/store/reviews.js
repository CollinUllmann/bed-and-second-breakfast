// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


//action types
const LOAD_REVIEWS = 'review/LOAD_REVIEWS'


//action creators
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})


//thunks
export const thunkFetchReviewsBySpotId = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}/reviews`);
  if (res.ok) {
    const data = await res.json();
    dispatch(loadReviews(data.Reviews))
    return null
  }
  return null
}


//selectors

export const selectReviews = state => state.reviews

export const selectReviewsBySpotId = createSelector(
  selectReviews,
  entries => (spotId) => {
    let entriesArr = Object.values(entries).filter(review => {
      return review.spotId == spotId
    })
    return entriesArr
  }
)


//reducer
let initialState = {}
function reviewsReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_REVIEWS: {
      const reviewState = { ...state };
      console.log(action)
      action.reviews.forEach((review) => {
        reviewState[review.id] = review
      })
      return reviewState
    }
    default:
      return state;
  }
}

export default reviewsReducer;
