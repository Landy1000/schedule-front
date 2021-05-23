import React ,{ useEffect } from 'react';
import { PrimaryButton } from "../UIkit"
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import { editSchedule, fetchSchedules } from '../../reducks/schedules/operations';
import { getRoomSchedules } from "../../reducks/schedules/selectors";
import { getRoommates } from "../../reducks/roommates/selectors";
import { getUserId, getUserName } from "../../reducks/users/selectors";
import { push } from 'connected-react-router'


const ScheduleEdit = () => {
  const { id } = useParams()
  const { date } = useParams()

  // リンク
  const returnRoom = () => {
    dispatch(push("/room/"+id))
  }
  
  const timeVar = [];
  for (let i = 0; i <24; i++) {
    timeVar.push( {id: i, text: i+":00"} )
  }

  const dispatch = useDispatch()
  useEffect( () => {
      dispatch(fetchSchedules(id))
  }, [dispatch, id]);

  const mySchedules = []
  const roomMatesSchedules = []

  const selector = useSelector(state => state)
  const scheduleList = getRoomSchedules(selector)
  const userId = getUserId(selector)
  const username = getUserName(selector)
  const roommates = getRoommates(selector)

  // 日付が一致するものだけを抽出
  const schedules = []
  scheduleList.forEach(schedule=>{
    if (schedule.date===date)
      schedules.push(schedule)
  })

  // マッチ率の判定
  const numberOfPeople = roommates.length
  const match = []
  for (let i = 0; i <24; i++) {
    let count = 0
    schedules.forEach(schedule=>{
      if (schedule.time===i)
        count+=1
    })
    if (count === numberOfPeople)
      match.push("match100")
    else if (count >= numberOfPeople/2)
      match.push("match50")
    else if (count > 0)
      match.push("match25")
    else
      match.push("match0")
  }

  // ルームメイトリストから現在のユーザーを取り除く
  for (let i = 0; i <roommates.length; i++) {
    if (roommates[i].id === userId)
    roommates.splice(i, 1);
  }

  // 自分とルームメイトのスケジュールを分ける
  schedules.forEach(schedule => {
    if (schedule.user_id === userId)
      mySchedules.push(schedule)
    else
      roomMatesSchedules.push(schedule)
  });

  // マイスケジュールとマッチ率の合成
  const myScheduleList = [];
  for (let i = 0; i <24; i++) {
    let bool = false
    mySchedules.forEach(element => {
      if (element.time===i){
        myScheduleList.push({id: i, bool: true, style: match[i]+" my-schedule", elementId: element.id})
        bool = true
      }
      
    });
    if (!bool)
      myScheduleList.push({id: i, bool: false, style: "match0 my-schedule"})
  }

  // ルームメイトスケジュールとマッチ率の合成
  const roomMatesScheduleList = [];
  roommates.forEach(roommate => {
    let tempList = [];
    for (let i = 0; i <24; i++) {
      let bool = false
      roomMatesSchedules.forEach(element => {
        if (element.time===i && roommate.id===element.user_id){
          tempList.push({id: i, text: "○", style: match[i]+" roommates-schedule"})
          bool = true
        }
        
      });
      if (!bool)
        tempList.push({id: i, text: "×", style: "match0 roommates-schedule"})
    }
    roomMatesScheduleList.push(tempList)
  })

  const roommatesScheduleTable = Object.keys(roomMatesScheduleList).map(function(i) {
    return (
            <div key={i} className="test-container2">
              {roomMatesScheduleList[i].map(schedule => (
                <div key={schedule.id} className={schedule.style} >
                </div>
              ))}
            </div>
    );
  });

  const roommatesIndex = roommates.map(roommate => (
    <div key={roommate.id} className="roommates-name" >
      {roommate.name}
    </div>
  ))

    
    return (
  
    <div className="c-section-wrapin">
      <h1 className="text-left">{date}</h1>
      <br/>
      <div className="table_wrap">
        {/* タイムバー */}
        <div className="test-container2">
          <div className="time-bar">
          </div>
          {timeVar.length > 0 && (
            timeVar.map(item => (
                <div className="time-bar" key={item.id}>{item.text}</div>
            ))
          )}
        </div>
        {/* ユーザーバー */}
        <div className="test-container2">
          <div className="my-name">{username}</div>
          {myScheduleList.length > 0 && (
              myScheduleList.map(mySchedule => (
                <div key={mySchedule.id} className={mySchedule.style} >
                  <button key={mySchedule.id} className={mySchedule.style} onClick={() => dispatch(editSchedule(date, mySchedule.id, mySchedule.elementId, id, mySchedule.bool))}></button>
                </div>
              ))
            )}
        </div>
        {/* ルームメイトバー */}
        <div>
          <div className="test-container">{roommatesIndex}</div>
          <div className="test-container">{roommatesScheduleTable}</div>
        </div>
      </div>

      <div className="center">
        <br/>
        <PrimaryButton
          label={"ルームに戻る"}
          onClick={returnRoom}
        />
      </div>
      
    </div>
    )
  }

export default ScheduleEdit
