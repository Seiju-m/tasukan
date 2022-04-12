import {
  GET_TASK,
  ADD_TO_TASK_LIST,
  SORT_TASK,
  UPDATE_STATUS,
  UPDATE_TASk,
  REMOVE_FROM_TASK_LIST,
} from "./actions";

import { ADD_TODO, DEL_TODO, TOGGLE_TODO, VisibilityFilters } from "./actions";

const initialState = {
  task: [],
  tasklist: [],
};

export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_TASK:
    //   return { ...state, task: action.payload };
    case ADD_TO_TASK_LIST:
      return {
        ...state,
        tasklist: [
          ...state.tasklist,
          {
            task: action.payload,
            id: action.id,
            time: action.time,
            completed: false,
          },
        ],
      };
    case REMOVE_FROM_TASK_LIST:
      return {
        ...state,
        tasklist: state.tasklist.filter((task) => task.id !== action.id),
      };
    case UPDATE_STATUS:
      return {
        ...state,
        tasklist: state.tasklist.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case UPDATE_TASk:
      return {
        ...state,
        tasklist: state.tasklist.map((task) =>
          task.id === action.id
            ? { ...task, task: action.payload, time: action.time }
            : task
        ),
        // tasklist: state.tasklist.map((task) =>
        //   task.id === action.id ? { ...task, time: action.time } : task
        // ),
      };
    case SORT_TASK:
      return {
        ...state,
        tasklist: action.payload,
      };
    default:
      return state;
  }
};

export const visibilityFilter = (
  state = VisibilityFilters.SHOW_ALL,
  action
) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};
