export const SIGN_IN = "SIGN_IN"
export const signInAction = (userState) => {
  return{
    type: "SIGN_IN",
    payload:{
      isSignedIn: true,

      accessToken: userState.accessToken,
      uid: userState.uid,
      client: userState.client,

      username: userState.username,
      id: userState.id
    }
  }
};

export const SIGN_OUT = "SIGN_OUT"
export const signOutAction = () => {
  return{
    type: "SIGN_OUT",
    payload:{
      isSignedIn: false,

      accessToken: "",
      uid: "",
      client: "",
      username: "",
      id: ""
      
    }
  }
};
