import React ,{useCallback, useState, useEffect} from 'react';
import {PrimaryButton, SelectBox, TextInput} from "../UIkit"
import { useDispatch, useSelector } from 'react-redux';
import { createRoom } from '../../reducks/rooms/operations';
import { fetchFriends } from '../../reducks/friends/operations';
import { getFriends } from "../../reducks/friends/selectors";

const RoomEdit = () => {
  const [roomName, setRoomName] = useState("");
  const [roomMate, setRoomMate] = useState([]);
  
  const inputRoomName = useCallback((event) => {
    setRoomName(event.target.value)
  },[]);

  const dispatch = useDispatch()
  const selector = useSelector(state => state)
  const friends = getFriends(selector)

  useEffect( () => {
      dispatch(fetchFriends())
  }, []);

  return (
    <section>
      <h2 className="u-text_headline u-text-center">新規ルーム作成</h2>
      <div className="c-section-container">
      <TextInput
        fullWidth={true} label={"ルーム名（16文字まで）"} multiline={false} required={true}
        rows={1} value={roomName} type={"text"} onChange={inputRoomName}
        />

        <SelectBox
          label={"ルームメイトを選択"} required={true} options={friends} select={setRoomMate} value={roomMate}
        />
      </div>
      
      <div className="center">
        <PrimaryButton
          label={"ルームを作る"}
          onClick={() => dispatch(createRoom(roomName, roomMate))}
        />
      </div>
    </section>
  )
}

export default RoomEdit
