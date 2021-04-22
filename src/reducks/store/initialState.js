const initialState = {
  users: {
    isSignedIn: false,
      accessToken: "",
      client: "",
      uid: "",
      username: "",
      id: ""
  },
  myRooms: {
    list: []
  },
  friends: {
    list: []
  },
  schedules: {
    list: []
  }
}

export default initialState