import { signInAction, signOutAction } from "./actions"
import {push} from 'connected-react-router'
import axios from 'axios';

export const signIn = (email, password) => {
  return async (dispatch, getState) => {
    const state = getState()
    const isSignedIn = state.users.isSignedIn
    console.log(state.users)

    if (!isSignedIn) {

      axios.post('http://localhost:3001/v1/auth/sign_in', {
        email: email,
        password: password
      })
      .then(res => {
        const userInitialData = {
          access_token: res.headers.["access-token"],
          uid: res.headers.uid,
          client: res.headers.client
        }
        console.log(res.data)

        dispatch(signInAction({
          isSignedIn: true,
          accessToken: res.headers.["access-token"],
          uid: res.headers.uid,
          client: res.headers.client
        }))
        dispatch(push('/'));

      })
    }
  }
}

export const signUp = (username, email, password, confirmPassword) => {
  return async (dispatch) => {
    if (username === "" || email === "" || password === "" || confirmPassword === ""){
      alert("必須項目が未入力です")
      return false
    }
    if (password !== confirmPassword){
      alert("パスワードが一致しません。もう一度お試しください。")
      return false
    }

    axios.post('http://localhost:3001/v1/auth/', {
      name: username,
      email: email,
      password: password,
      password_confirmation: confirmPassword
    })
    .then(res => {
      console.log(res.headers)

      dispatch(signInAction({
        isSignedIn: true,
        accessToken: res.headers.["access-token"],
        uid: res.headers.uid,
        client: res.headers.client
      }))
      dispatch(push('/'));
    })

  }
}

export const signOut = () => {

  return async (dispatch, getState) => {
    const state = getState()
    const token = state.users.accessToken
    const uid = state.users.uid
    const client = state.users.client
    axios({
      method: 'delete',
      url: 'http://localhost:3001/v1/auth/sign_out',
      headers: {
        ["access-token"]: token,
        uid: uid,
        client: client,
        //["Content-Type"]: "application/json"
      }
    })
    .then(res => {
      console.log(res.headers)

      dispatch(signOutAction());
      dispatch(push('/signin'));
    })

  }
}

