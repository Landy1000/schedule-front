import { createSelector } from "reselect";

const friendsSelector = (state) => state.friends;

export const getFriends = createSelector(
  [friendsSelector],
  state => state.list
)