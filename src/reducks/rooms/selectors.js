import { createSelector } from "reselect";

const roomsSelector = (state) => state.myRooms;

export const getMyRooms = createSelector(
  [roomsSelector],
  state => state.list
)