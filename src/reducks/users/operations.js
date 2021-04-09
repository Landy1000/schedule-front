import {signInAction} from "./actions"
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
        console.log(userInitialData)

        dispatch(signInAction({
          isSignedIn: true,
          accessToken: res.headers.["access-token"],
          uid: res.headers.uid,
          client: res.headers.client
        }))
        dispatch(push('/'))

      })
      

    //history=useHistory();
    history.push("/")
    }
  }
}

