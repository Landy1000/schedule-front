import React ,{useCallback, useState, useEffect} from 'react';
// import { signIn } from '../../reducks/users/operations';
import {PrimaryButton, SelectBox, TextInput} from "../UIkit"
import { useDispatch, useSelector } from 'react-redux';
import {Link} from "react-router-dom";

import { createRoom } from '../../reducks/rooms/operations';
import { editSchedule, fetchSchedules } from '../../reducks/schedules/operations';
import { getMySchedules } from "../../reducks/schedules/selectors";


const ScheduleEdit = () => {
  
    const items = [];
    for (let i = 0; i <24; i++) {
      items.push( {id: i, text: i+":00"} )
    }

    const times = [];
    for (let i = 0; i <24; i++) {
      times.push( i )
    }

    const dispatch = useDispatch()
    
    // const inputRoomName = useCallback((event) => {
    //   setRoomName(event.target.value)
    // },[]);

    // const selector = useSelector(state => state)
    // // const username = getUserName(selector)
    // const friends = getFriends(selector)

    useEffect( () => {
        dispatch(fetchSchedules())
    }, []);

    const mySchedules = []
    const roomMatesSchedules = []

    const selector = useSelector(state => state)
    const schedules = getMySchedules(selector)

    schedules.forEach(element => {
      if (element.user_id===1)
      mySchedules.push(element)
      else
      roomMatesSchedules.push(element)
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
      <h1>2020-5-23</h1>
      <div className="test-container">
        <div className="test-container2">
          <div className="time-var">
          </div>
            {items.length > 0 && (
              items.map(item => (
                  <div className="time-var" key={item.id}>{item.text}</div>
              ))
            )}
        </div>
      
          <div className="test-container2">
            <div className="time">user</div>
            {my.length > 0 && (
                my.map(time => (
                  <div key={time.id} className={time.style} >
                    <button className={time.style} onClick={() => dispatch(editSchedule(time.id, time.elementId, time.text))}></button>
                  </div>
                ))
              )}
          </div>

        <div className="test-container2">
          <div className="time">friend schedule</div>
          {roomMates.length > 0 && (
                roomMates.map(time => (
                  <div key={time.id} className={time.style} >
                    
                  </div>
                ))
              )}
        </div>

        {/* <div className="test-container2">
            <div className="time">user</div>
            {times.length > 0 && (
                times.map(time => (
                  <div key={time}>
                    <PrimaryButton
                    label={"○"}
                    onClick={() => dispatch(editSchedule(time))}
                    />

                  </div>
                ))
              )}
          </div> */}

      </div>
      <ul>
        <li><Link to="/room/">ルームに戻る</Link></li>
      </ul>

    </div>
    )
  }

export default ScheduleEdit


