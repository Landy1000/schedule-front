import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getUserName } from "../../reducks/users/selectors";
import { RoomCard } from "../UIkit"
import { useDispatch } from 'react-redux';
import { fetchMyRooms } from '../../reducks/rooms/operations';
import { getMyRooms } from "../../reducks/rooms/selectors";
import AddCircleOutlinedIcon from '@material-ui/icons/AddCircleOutlined';
import {push} from 'connected-react-router'


function Home() {
    const dispatch = useDispatch()
    // リンク
    const createRoom = () => {
        dispatch(push("/room/edit"))
    }

    useEffect( () => {
        dispatch(fetchMyRooms())
    }, []);

    const selector = useSelector(state => state)
    const username = getUserName(selector)
    const myRooms = getMyRooms(selector)

    return(
        <div className="c-section-container">
            <h1 className="u-text_headline u-text-center">ようこそ、{username}さん</h1>
            <br/>
            <div className="center">
                {myRooms.length > 0 && (
                    myRooms.map(myRoom => (
                        <>
                            <RoomCard
                                id={myRoom.id}
                                name={myRoom.name}
                            />
                            <br/>
                        </>
                    ))
                )}
            </div>
            <div className="center">
                <br/>
                <AddCircleOutlinedIcon
                    onClick={createRoom}
                    fontSize="large"
                    style={{ color: "#4dd0e1", fontSize: 50 }}
                />
            </div>
        </div>
    );
}

export default Home;