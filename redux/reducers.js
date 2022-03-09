import {
  GET_TASK,
  ADD_TO_TASK_LIST,
  SORT_TASK,
  UPDATE_TASK,
  REMOVE_FROM_TASK_LIST,
} from "./actions";

import { ADD_TODO, DEL_TODO, TOGGLE_TODO, VisibilityFilters } from "./actions";

const initialState = {
  task: [],
  tasklist: [],
};

// export const taskReducer = (state = [], action) => {
export const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    // case GET_TASK:
    //   return { ...state, task: action.payload };
    case ADD_TO_TASK_LIST:
      // return [
      //   ...state,
      //   { task: action.payload, completed: false, id: action.id },
      // ];
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
      console.log("in reducer");
      console.log(state);

      // return state.tasklist.filter((task) => task.id !== action.id);
      return {
        ...state,
        tasklist: state.tasklist.filter((task) => task.id !== action.id),
      };
    case UPDATE_TASK:
      // return state.map((todo) =>
      //   todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      // );
      return {
        ...state,
        tasklist: state.tasklist.map((task) =>
          task.id === action.id ? { ...task, completed: !task.completed } : task
        ),
      };
    case SORT_TASK:
      return {
        ...state,
        tasklist: action.payload,
      };
    // case SET_VISIBILITY_FILTER:
    //   return action.filter;
    default:
      return state;
  }
};

export const todos = (state = [], action) => {
  switch (action.type) {
    case ADD_TODO:
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
          time: action.time,
        },
      ];
    case DEL_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
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

// export default taskReducer;
