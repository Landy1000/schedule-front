import React ,{useCallback, useState, useEffect} from 'react';
// import { signIn } from '../../reducks/users/operations';
import {PrimaryButton, SelectBox, TextInput} from "../UIkit"
import { useDispatch, useSelector } from 'react-redux';
import {Link, useParams} from "react-router-dom";

import { createRoom } from '../../reducks/rooms/operations';
import { editSchedule, fetchSchedules } from '../../reducks/schedules/operations';
import { getMySchedules } from "../../reducks/schedules/selectors";
import { getUserId } from "../../reducks/users/selectors";


const ScheduleEdit = () => {
  const { id } = useParams()
  const { date } = useParams()
  
  const timeVar = [];
  for (let i = 0; i <24; i++) {
    timeVar.push( {id: i, text: i+":00"} )
  }

  const dispatch = useDispatch()
  useEffect( () => {
      dispatch(fetchSchedules())
  }, []);

  const mySchedules = []
  const roomMatesSchedules = []

  const selector = useSelector(state => state)
  const schedules = getMySchedules(selector)
  const userId = getUserId(selector)

  schedules.forEach(schedule => {
    if (schedule.user_id === userId)
      mySchedules.push(schedule)
    else
      roomMatesSchedules.push(schedule)
  });

    const my = [];
    for (let i = 0; i <24; i++) {
      let bool = false
      mySchedules.forEach(element => {
        if (element.time===i){
          my.push({id: i, text: "true", style: "ok my-schedule", elementId: element.id})
          bool = true
        }
        
      });
      if (!bool)
        my.push({id: i, text: "false", style: "ng my-schedule"})
    }

    const roomMates = [];
    for (let i = 0; i <24; i++) {
      let bool = false
      roomMatesSchedules.forEach(element => {
        if (element.time===i){
          roomMates.push({id: i, text: "○", style: "ok room-mates-schedule"})
          bool = true
        }
        
      });
      if (!bool)
        roomMates.push({id: i, text: "×", style: "ng room-mates-schedule"})
    }

    
    return (
  
    <div className="c-section-container">
      <h1>{date}</h1>
      <div className="test-container">
        <div className="test-container2">
          <div className="time-var">
          </div>
            {timeVar.length > 0 && (
              timeVar.map(item => (
                  <div className="time-var" key={item.id}>{item.text}</div>
              ))
            )}
        </div>
      
          <div className="test-container2">
            <div className="time">user</div>
            {my.length > 0 && (
                my.map(time => (
                  <div key={time.id} className={time.style} >
                    <button className={time.style} onClick={() => dispatch(editSchedule(date, time.id, time.elementId, id, time.text))}></button>
                  </div>
                ))
              )}
          </div>

        <div className="test-container2">
          <div className="time-room-mates">friend schedule</div>
          {roomMates.length > 0 && (
                roomMates.map(time => (
                  <div key={time.id} className={time.style} >
                    
                  </div>
                ))
              )}
        </div>
      </div>

      <ul>
        <li><Link to={"/room/"+id}>ルームに戻る</Link></li>
      </ul>

    </div>
    )
  }

export default ScheduleEdit


