import {
  createStore as reduxCreateStore,
  combineReducers,
  applyMiddleware
} from 'redux';
import thunk from 'redux-thunk'
import {connectRouter, routerMiddleware} from 'connected-react-router';

import {UsersReducer} from '../users/reducers';
import {RoomsReducer} from '../rooms/reducers';
import {FriendsReducer} from '../friends/reducers';
import { SchedulesReducer } from '../schedules/reducers';
import { RoommatesReducer } from '../roommates/reducers';

export default function createStore(history){
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      myRooms: RoomsReducer,
      friends: FriendsReducer,
      schedules: SchedulesReducer,
      roommates: RoommatesReducer
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}