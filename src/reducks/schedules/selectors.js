import { createSelector } from "reselect";

const schedulesSelector = (state) => state.schedules;

export const getMySchedules = createSelector(
  [schedulesSelector],
  state => state.list
)