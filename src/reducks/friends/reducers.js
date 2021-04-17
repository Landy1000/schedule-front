import * as Actions from './actions'
import initialState from '../store/initialState'

export const FriendsReducer = (state = initialState.friends, action) => {
  switch (action.type) {
    case Actions.FETCH_FRIENDS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
}