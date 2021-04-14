export const FETCH_MY_ROOMS = "FETCH_MY_ROOMS"
export const fetchMyRoomsAction = (myRooms) => {
  return{
    type: "FETCH_MY_ROOMS",
    payload: myRooms
  }
};