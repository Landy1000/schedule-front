export const FETCH_ROOMMATES = "FETCH_ROOMMATES"
export const fetchRoommatesAction = (roommateList) => {
  return{
    type: "FETCH_ROOMMATES",
    payload: roommateList,
  }
};