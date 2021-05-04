import { fetchMyRoomsAction, deleteRoomAction } from "./actions"
import {push} from 'connected-react-router'
import axios from 'axios';

export const deleteRoom = (id) => {
  return async (dispatch, getState) => {
    const state = getState()
    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client

    axios({
      method: 'delete',
      url: 'http://localhost:3001/rooms/'+id,
      headers: {
        ["access-token"]: token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      },

    })
    .then(() => {
        const prevRooms = getState().myRooms.list;
        const nextRooms = prevRooms.filter(room => room.id !== id)
        dispatch(deleteRoomAction(nextRooms));
    });
  }
}

export const createRoom = (name, user_ids) => {
  return async (dispatch, getState) => {

    const state = getState()
    const userId = state.users.id

    const list = user_ids
    list.push(userId)
    const data = {
      room:{
        name: name,
        user_ids: list
      }
    }

    console.log(data)

    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client
    axios({
      method: 'post',
      url: 'http://localhost:3001/rooms/',
      headers: {
        ["access-token"]: token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      },
      data

    })
    .then(snapshots => {
      
      console.log(snapshots)
      dispatch(push('/'));
    });
  }
}

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
