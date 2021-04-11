import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from "react-router-dom";
import { getUserName } from "../../reducks/users/selectors";
import { PrimaryButton } from "../UIkit"
import { useDispatch } from 'react-redux';
import { signOut } from '../../reducks/users/operations';

function Home() {
    const dispatch = useDispatch()
    const selector = useSelector(state => state)
    const username = getUserName(selector)

    return(
        <div>
        <h1>ようこそ、{username}さん</h1>
        <ul>
            <li><Link to="/signup">新規ルーム作成</Link></li>
            <li><Link to="/signin/">ルームを選ぶ</Link></li>
        </ul>
        <PrimaryButton
            label={"ログアウト"}
            onClick={() => dispatch(signOut())}
        />
        </div>
    );
}

export default Home;
