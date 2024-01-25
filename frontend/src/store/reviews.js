// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


//action types
const LOAD_REVIEWS = 'review/LOAD_REVIEWS'
const DELETE_REVIEW = 'review/DELETE_REVIEW'


//action creators
export const loadReviews = (reviews) => ({
  type: LOAD_REVIEWS,
  reviews
})

export const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  reviewId
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

export const thunkFetchCreateReview = (spotId, review) => (dispatch) => {
  let reviewJson = JSON.stringify(review)
  console.log('reviewJson', reviewJson)
  return csrfFetch(`/api/spots/${spotId}/reviews`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: reviewJson
  }).then(async res => {
    const data = await res.json()
    dispatch(loadReviews([data]))
  }).catch(async res => {
    const data = await res.json()
    console.log('error return from thunk: ', data)
    return data.errors
  })
}

export const thunkFetchDeleteReview = (reviewId) => (dispatch) => {
  return csrfFetch(`/api/reviews/${reviewId}`, {
    method: 'DELETE'
  }).then(() => {
    dispatch(deleteReview(reviewId))
  })
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
      action.reviews.forEach((review) => {
        reviewState[review.id] = review
      })
      return reviewState
    }
    case DELETE_REVIEW: {
      const reviewState = { ...state };
      delete reviewState[action.reviewId]
      return reviewState
    }
    default:
      return state;
  }
}

export default reviewsReducer;
