import { fetchFriendsAction } from "./actions"
import {push} from 'connected-react-router'
import axios from 'axios';

export const fetchFriends = () => {

  return async (dispatch, getState) => {
    const state = getState()
    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client
    axios({
      method: 'get',
      url: 'http://localhost:3001/users',
      headers: {
        ["access-token"]: token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      }
    })
    .then(snapshots => {
      const data = snapshots.data
      const friendList = []
      for (const item in data) {
        const friend = data[item]
        friendList.push(friend)
      };

      dispatch(fetchFriendsAction(friendList))

    });
  }
}
