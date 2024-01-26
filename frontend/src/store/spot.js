import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import { loadUsers } from "./users";
import { loadSpotImages } from "./spotImages";


//action types
const LOAD_SPOTS = 'spot/LOAD_SPOTS'
const ADD_SPOT = 'spot/ADD_SPOT'
const DELETE_SPOT = 'spot/DELETE_SPOT'
const UPDATE_SPOT = 'spot/UPDATE_SPOT'


//action creators
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

export const addSpot = (spot) => ({
  type: ADD_SPOT,
  spot
})

export const deleteSpot = (spotId) => ({
  type: DELETE_SPOT,
  spotId
})

export const updateSpot = (spotId, updatedSpot) => ({
  type: UPDATE_SPOT,
  spotId,
  updatedSpot
})

//thunks
export const thunkFetchSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')
  const data = await res.json();
  const spots = data.Spots;
  dispatch(loadSpots(spots))
  return spots
}

export const thunkFetchSpotById = (spotId) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`)
  const data = await res.json();
  const { Owner, SpotImages, ...spot } = data;
  dispatch(loadUsers([Owner]))
  dispatch(loadSpots([spot]))
  dispatch(loadSpotImages(SpotImages.map(spotImage => {
    return {
      id: spotImage.id,
      spotId: spot.id,
      url: spotImage.url,
      preview: spotImage.preview
    }
  })))
  return data
}

export const thunkFetchCreateSpot = (spot) => async (dispatch) => {
  const res = await csrfFetch('/api/spots/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spot)
  })

  if (res.ok) {
    const newSpot = await res.json()
    dispatch(addSpot(newSpot))
    return newSpot
  }
  return null
}

export const thunkFetchDeleteSpot = (spotId) => (dispatch) => {
  return csrfFetch(`/api/spots/${spotId}`, {
    method: 'DELETE'
  }).then(() => {
    dispatch(deleteSpot(spotId))
  })
}

export const thunkFetchUpdateSpot = (spotId, updatedSpot) => async (dispatch) => {
  const res = await csrfFetch(`/api/spots/${spotId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updatedSpot)
  })
  const data = await res.json()
  console.log('response from backend updateSpot: ', data)
  dispatch(updateSpot(spotId, data))
  return data
}


//selectors
export const selectSpots = state => state.spots

export const selectSpotsArray = createSelector(
  selectSpots,
  entries => Object.values(entries)
)

export const selectSpotById = createSelector(
  selectSpots,
  entries => (spotId) => entries[spotId]
)

//reducer
let initialState = {}
function spotReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spotsState = { ...state };
      action.spots.forEach((spot) => {
        spotsState[spot.id] = spot
      })
      return spotsState
    }
    case ADD_SPOT: {
      return { ...state, entries: { ...state.entries, [action.spot.id]: action.spot } }
    }
    case DELETE_SPOT: {
      const spotsState = { ...state };
      delete spotsState[action.spotId]
      return spotsState
    }
    case UPDATE_SPOT: {
      const spotsState = { ...state };
      spotsState[action.spotId] = action.updateSpot
      return spotsState
    }
    default:
      return state;
  }
}

export default spotReducer;
