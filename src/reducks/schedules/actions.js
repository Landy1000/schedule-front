export const FETCH_SCHEDULES = "FETCH_SCHEDULES"
export const fetchSchedulesAction = (schedules) => {
  return{
    type: "FETCH_SCHEDULES",
    payload: schedules
  }
};