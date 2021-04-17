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

export default function createStore(history){
  return reduxCreateStore(
    combineReducers({
      router: connectRouter(history),
      users: UsersReducer,
      myRooms: RoomsReducer,
      friends: FriendsReducer,
    }),
    applyMiddleware(
      routerMiddleware(history),
      thunk
    )
  )
}