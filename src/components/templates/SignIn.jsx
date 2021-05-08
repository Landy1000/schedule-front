import React ,{useCallback, useState} from 'react';
import { signIn } from '../../reducks/users/operations';
import {PrimaryButton, TextInput} from "../UIkit"
import { useDispatch } from 'react-redux';
import {Link} from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch()

  const [email, setEmail] = useState(""),
        [password, setPassword] = useState("")

  const inputEmail = useCallback((event) => {
    setEmail(event.target.value)
  },[]);

  const inputPassword = useCallback((event) => {
    setPassword(event.target.value)
  },[]);

  return(

      <div className="c-section-container">
        <h2 className="u-text_headline u-text-center">ログイン</h2>
        <TextInput
        fullWidth={true} label={"Email"} multiline={false} required={true}
        rows={1} value={email} type={"text"} onChange={inputEmail}
        />
        <TextInput
        fullWidth={true} label={"パスワード"} multiline={false} required={true}
        rows={1} value={password} type={"password"} onChange={inputPassword}
        />
        <div className="center">
          <br/>
          <PrimaryButton
            label={"ログイン"}
            onClick={() => dispatch(signIn(email, password))}
          />
        </div>
        <br/>
        <br/>
        <br/>
        <div className="right">
          <Link to="/signup/">アカウント登録はこちら</Link>
        </div>
      </div>
  );
}


export default SignIn;
