import React ,{useCallback, useState} from 'react';
import {PrimaryButton, TextInput} from "../UIkit"
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux';

import { signUp } from '../../reducks/users/operations';


const SignUp = () => {

  const dispatch = useDispatch()

  const [username, setUsername] = useState(""),
        [email, setEmail] = useState(""),
        [password, setPassword] = useState(""),
        [confirmPassword, setConfirmPassword] = useState("");

  const inputUsername = useCallback((event) => {
    setUsername(event.target.value)
  },[]);

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[]);

  const inputConfirmPassword = useCallback((event) => {
    setConfirmPassword(event.target.value)
  },[]);

  return(

      <div className="c-section-container">
        <li><Link to="/signin/">ログイン</Link></li>
        <h2 className="u-text_headline u-text-center">アカウント登録</h2>
        <TextInput
        fullWidth={true} label={"ユーザー名"} multiline={false} required={true}
        rows={1} value={username} type={"text"} onChange={inputUsername}
        />
        <TextInput
        fullWidth={true} label={"Email"} multiline={false} required={true}
        rows={1} value={email} type={"text"} onChange={inputEmail}
        />
        <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
        />
        <TextInput
        fullWidth={true} label={"パスワード（再確認）"} multiline={false} required={true}
        rows={1} value={confirmPassword} type={"password"} onChange={inputConfirmPassword}
        />
        <div className="center">
          <PrimaryButton
            label={"アカウントを登録する"}
            onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
          />
        </div>
      </div>
  );
}


export default SignUp;
