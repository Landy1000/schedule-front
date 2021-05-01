export const FETCH_SCHEDULES = "FETCH_SCHEDULES"
export const fetchSchedulesAction = (list) => {
  return{
    type: "FETCH_SCHEDULES",
    payload: list,
  }
};