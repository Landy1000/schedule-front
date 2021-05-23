import { fetchSchedulesAction } from "./actions"
import { fetchRoommatesAction } from "../roommates/actions"
import {push} from 'connected-react-router'
import axios from 'axios';

export const editSchedule = (date, time, elementId, roomId, bool) => {
  if (!bool){
  return async (dispatch, getState) => {

    const state = getState()

    const data = {
      schedule:{
        date: date,
        time: time,
      }
    }

    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client


    axios({
      method: 'post',
      url: process.env.REACT_APP_API_URL+'/rooms/'+roomId+'/schedules',
      headers: {
        "access-token": token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      },
      data

    })
    .then(snapshots => {
      
      console.log(snapshots)
      dispatch(push('/'))
      dispatch(push('/room/'+roomId+'/'+date));
    });
  }}
  else{
    return async (dispatch, getState) => {

      const state = getState()
  
      const data = {
        schedule:{
          date: date,
          time: time,
        }
      }
  
      const token = state.users.accessToken
      const uid = state.users.uid
      const client = state.users.client
  
      axios({
        method: 'delete',
        url: process.env.REACT_APP_API_URL+'/rooms/'+roomId+'/schedules/'+elementId,
        headers: {
          "access-token": token,
          uid: uid,
          client: client,
          //["Content-Type"]: "application/json"
        },
        data
  
      })
      .then(() => {
        dispatch(push('/'))
        dispatch(push('/room/'+roomId+'/'+date));
      });
    }
  }
}


export const fetchSchedules = (roomId) => {

  return async (dispatch, getState) => {
    const state = getState()
    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client
    axios({
      method: 'get',
      url: process.env.REACT_APP_API_URL+'/rooms/'+roomId+'/schedules',
      headers: {
        "access-token": token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      }
    })
    .then(snapshots => {
      const schedules = snapshots.data.schedules
      const roommates = snapshots.data.roommates
      
      const scheduleList = []
      for (const item in schedules) {
        const schedule = schedules[item]
        scheduleList.push(schedule)
      };

      const roommateList = []
      for (const item in roommates) {
        const roommate = roommates[item]
        roommateList.push(roommate)
      };

      dispatch(fetchSchedulesAction(scheduleList))
      dispatch(fetchRoommatesAction(roommateList))
    });
  }
}
