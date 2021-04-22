import { fetchSchedulesAction } from "./actions"
import {push} from 'connected-react-router'
import axios from 'axios';

export const editSchedule = (time) => {
  return async (dispatch, getState) => {

    const state = getState()
    const userId = state.users.id

    const data = {
      schedule:{
        date: "2020-05-23",
        time: time,
      }
    }

    console.log(data)

    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client
    axios({
      method: 'post',
      url: 'http://localhost:3001/rooms/1/schedules',
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
      dispatch(push('/schedule'));
    });
  }
}


export const fetchSchedules = () => {

  return async (dispatch, getState) => {
    const state = getState()
    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client
    axios({
      method: 'get',
      url: 'http://localhost:3001/rooms/1/schedules',
      headers: {
        ["access-token"]: token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      }
    })
    .then(snapshots => {
      const data = snapshots.data
      const scheduleList = []
      for (const item in data) {
        const room = data[item]
        scheduleList.push(room)
      };

      dispatch(fetchSchedulesAction(scheduleList))

    });
  }
}
