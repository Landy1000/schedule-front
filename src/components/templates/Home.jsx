import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getUserName } from "../../reducks/users/selectors";
import { PrimaryButton, RoomCard } from "../UIkit"
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducks/users/operations';
import { fetchMyRooms } from '../../reducks/rooms/operations';
import { getMyRooms } from "../../reducks/rooms/selectors";



function Home() {
    const dispatch = useDispatch()
    

    useEffect( () => {
        dispatch(fetchMyRooms())
    }, []);

    const selector = useSelector(state => state)
    const username = getUserName(selector)
    const myRooms = getMyRooms(selector)

    return(
        <div className="c-section-container">
            <h1 className="u-text_headline u-text-center">ようこそ、{username}さん</h1>
            <div className="center">
                <Link to="/room/edit">新規ルーム作成</Link>
            </div>

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
                <PrimaryButton
                    label={"ログアウト"}
                    onClick={() => dispatch(signOut())}
                />
            </div>
        </div>
    );
}

export default Home;
