import { createSelector } from "reselect";

const schedulesSelector = (state) => state.schedules;

export const getRoomSchedules = createSelector(
  [schedulesSelector],
  state => state.list
)