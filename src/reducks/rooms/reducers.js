import * as Actions from './actions'
import initialState from '../store/initialState'

export const RoomsReducer = (state = initialState.myRooms, action) => {
  switch (action.type) {
    case Actions.DELETE_ROOM:
      return {
        ...state,
        list: [...action.payload]
      };
    case Actions.FETCH_MY_ROOMS:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
}