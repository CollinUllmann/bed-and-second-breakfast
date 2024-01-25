// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";
import { csrfFetch } from "./csrf";


//action types
const LOAD_USERS = 'spot/LOAD_USERS'


//action creators
export const loadUsers = (users) => ({
  type: LOAD_USERS,
  users
})

//thunks
export const thunkFetchUsers = () => async (dispatch) => {
  const res = await csrfFetch('/api/users')
  if (res.ok) {
    const users = await res.json()
    dispatch(loadUsers(users))
    return null
  }
  return null
}

//selectors

export const selectUsers = state => state.users



export const selectUserById = createSelector(
  selectUsers,
  entries => (userId) => userId == null ? null : entries[userId]
)

//reducer
let initialState = {}
function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_USERS: {
      const usersState = { ...state };
      action.users.forEach((user) => {
        usersState[user.id] = user
      })
      return usersState
    }
    default:
      return state;
  }
}

export default userReducer;
