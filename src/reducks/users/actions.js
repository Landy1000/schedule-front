
export const SIGN_IN = "SIGN_IN"
export const signInAction = (userState) => {
  return{
    type: "SIGN_IN",
    payload:{
      isSignedIn: true,

      accessToken: userState.accessToken,
      uid: userState.uid,
      client: userState.client
      
    }
  }
};
