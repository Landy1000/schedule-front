import * as Actions from './actions'
import initialState from '../store/initialState'

export const SchedulesReducer = (state = initialState.schedules, action) => {
  switch (action.type) {
    case Actions.FETCH_SCHEDULES:
      return {
        ...state,
        list: [...action.payload]
      };
    default:
      return state
  }
}