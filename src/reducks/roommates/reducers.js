import * as Actions from './actions'
import initialState from '../store/initialState'

export const RoommatesReducer = (state = initialState.roommates, action) => {
  switch (action.type) {
    case Actions.FETCH_ROOMMATES:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
}