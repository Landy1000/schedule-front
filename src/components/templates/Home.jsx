import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getUserName } from "../../reducks/users/selectors";
import { PrimaryButton } from "../UIkit"
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
        <div>
            <h1>ようこそ、{username}さん</h1>
            <ul>
                <li><Link to="/room/edit">新規ルーム作成</Link></li>
            </ul>

            <div>
                {myRooms.length > 0 && (
                    myRooms.map(myRoom => (
                        <div key={myRoom.id}><Link to={"/room/"+myRoom.id} >{myRoom.name}</Link></div>
                    ))
                )}
            </div>

            <PrimaryButton
                label={"ログアウト"}
                onClick={() => dispatch(signOut())}
            />
        </div>
    );
}

export default Home;
