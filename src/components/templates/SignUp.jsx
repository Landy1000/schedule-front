import React ,{useCallback, useState} from 'react';
import {PrimaryButton, TextInput} from "../UIkit"
import {Link} from "react-router-dom";
import { useDispatch } from 'react-redux';


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

      <div>
        <li><Link to="/login/">ログイン</Link></li>
        <h2>アカウント登録</h2>
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
        <div>
          <PrimaryButton
            label={"アカウントを登録する"}
            //onClick={() => dispatch(signUp(username, email, password, confirmPassword))}
          />
        </div>
      </div>
  );
}


export default SignUp;
