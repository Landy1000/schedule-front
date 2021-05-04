export const DELETE_ROOM = "DELETE_ROOM"
export const deleteRoomAction = (myRooms) => {
  return{
    type: "DELETE_ROOM",
    payload: myRooms
  }
};

export const FETCH_MY_ROOMS = "FETCH_MY_ROOMS"
export const fetchMyRoomsAction = (myRooms) => {
  return{
    type: "FETCH_MY_ROOMS",
    payload: myRooms
  }
};