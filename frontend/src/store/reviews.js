// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


//action types
const LOAD_REVIEWS = 'review/LOAD_REVIEWS'
const ADD_REVIEW = 'review/ADD_SPOT_IMAGES'


//action creators
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})

export const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

//thunks
export const thunkFetchCreateSpotImage = (spotId, review) => async (dispatch) => {
  const res = await csrfFetch(`/api/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(review)
  });
  if (res.ok) {
    console.log('response successfully received')
    const newReview = await res.json();
    dispatch(addReview(newReview))
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
      action.reviewState.forEach((review) => {
        reviewState[review.id] = review
      })
      return reviewState
    }
    case ADD_REVIEW: {
      const reviewState = { ...state };
      console.log(reviewState)
      return state
    }
    default:
      return state;
  }
}

export default reviewsReducer;
