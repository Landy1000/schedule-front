import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUserName = createSelector(
  [usersSelector],
  state => state.uid
)