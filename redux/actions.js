// // Define action types
export const GET_TASK = "GET_TASK";
export const ADD_TO_TASK_LIST = "ADD_TO_TASK_LIST";
export const REMOVE_FROM_TASK_LIST = "REMOVE_FROM_TASK_LIST";
export const UPDATE_TASK = "UPDATE_TASK";
export const SORT_TASK = "SORT_TASK";

export const ADD_TODO = "ADD_TODO";
export const DEL_TODO = "DEL_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

let nextTodoId = 1;

export const addTask = (task, time) => ({
  type: ADD_TO_TASK_LIST,
  payload: task,
  time: time,
  id: nextTodoId++,
});

export const removeTask = (id) => ({
  type: REMOVE_FROM_TASK_LIST,
  id,
});

export const updateTask = (id) => ({
  type: UPDATE_TASK,
  id,
});

export const sortTask = (taskList) => ({
  type: SORT_TASK,
  payload: taskList,
});

export const addTodo = (text, time) => ({
  type: ADD_TODO,
  id: nextTodoId++,
  text,
  time,
});

export const delTodo = (id) => ({
  type: DEL_TODO,
  id,
});

export const toggleTodo = (id) => ({
  type: TOGGLE_TODO,
  id,
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
