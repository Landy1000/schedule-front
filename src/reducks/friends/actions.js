export const FETCH_FRIENDS = "FETCH_FRIENDS"
export const fetchFriendsAction = (friend) => {
  return{
    type: "FETCH_FRIENDS",
    payload: friend
  }
};