// // Define action types
export const GET_TASK = "GET_TASK";
export const ADD_TO_TASK_LIST = "ADD_TO_TASK_LIST";
export const REMOVE_FROM_TASK_LIST = "REMOVE_FROM_TASK_LIST";
export const UPDATE_STATUS = "UPDATE_STATUS";
export const UPDATE_TASk = "UPDATE_TASk";
export const SORT_TASK = "SORT_TASK";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

export const addTask = (task, time, id) => ({
  type: ADD_TO_TASK_LIST,
  payload: task,
  time,
  id,
});

export const removeTask = (id) => ({
  type: REMOVE_FROM_TASK_LIST,
  id,
});

export const updateStatus = (id) => ({
  type: UPDATE_STATUS,
  id,
});

export const updateTask = (task, time, id) => ({
  type: UPDATE_TASk,
  payload: task,
  time,
  id,
});

export const sortTask = (taskList) => ({
  type: SORT_TASK,
  payload: taskList,
});

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};
