import { createSelector } from "reselect";

const roommatesSelector = (state) => state.roommates;

export const getRoommates = createSelector(
  [roommatesSelector],
  state => state.list
)