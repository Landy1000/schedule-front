import { fetchMyRoomsAction } from "./actions"
import {push} from 'connected-react-router'
import axios from 'axios';

export const fetchMyRooms = () => {

  return async (dispatch, getState) => {
    const state = getState()
    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client
    axios({
      method: 'get',
      url: 'http://localhost:3001/rooms',
      headers: {
        ["access-token"]: token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      }
    })
    .then(snapshots => {
      const data = snapshots.data
      const myRoomList = []
      for (const item in data) {
        const room = data[item]
        myRoomList.push(room)
      };
      console.log(myRoomList)

      dispatch(fetchMyRoomsAction(myRoomList))

    });
  }
}
