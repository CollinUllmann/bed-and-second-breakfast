import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";


//action types
const LOAD_SPOTS = 'spot/GET_SPOTS'


//action creators
export const loadSpots = (spots) => ({
  type: LOAD_SPOTS,
  spots
})

//thunks
export const thunkFetchSpots = () => async (dispatch) => {
  const res = await csrfFetch('/api/spots')
  const data = await res.json();
  const spots = data.Spots;
  dispatch(loadSpots(spots))
  console.log('fetched spots: ', spots)
  return spots
}

//selectors

export const selectSpots = state => state.spots

export const selectSpotsArray = createSelector(
  selectSpots,
  entries => Object.values(entries)
)

//reducer
let initialState = {}
function spotReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_SPOTS: {
      const spotsState = { ...state };
      action.spots.forEach((spot) => {
        console.log(`spot ${spot.id}: `, spot)
        spotsState[spot.id] = spot
      })
      return spotsState
    }
    default:
      return state;
  }
}

export default spotReducer;
