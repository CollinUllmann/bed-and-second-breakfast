// import { csrfFetch } from "./csrf";
import { createSelector } from "reselect";


//action types
const LOAD_USERS = 'spot/LOAD_USERS'


//action creators
export const loadUsers = (users) => ({
  type: LOAD_USERS,
  users
})

//thunks


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
