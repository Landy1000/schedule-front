import { createSelector } from "reselect";

const usersSelector = (state) => state.users;

export const getUserName = createSelector(
  [usersSelector],
  state => state.username
)

export const getUserId = createSelector(
  [usersSelector],
  state => state.id
)