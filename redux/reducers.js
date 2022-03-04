import {
  GET_TASK,
  ADD_TO_TASK_LIST,
  SORT_TASK,
  UPDATE_TASK,
  REMOVE_FROM_TASK_LIST,
  SET_VISIBILITY_FILTER,
} from "./actions";

const initialState = {
  task: [],
  tasklist: [],
};

function taskReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TASK:
      return { ...state, task: action.payload };
    case ADD_TO_TASK_LIST:
      return { ...state, tasklist: [...state.tasklist, action.payload] };
    case REMOVE_FROM_TASK_LIST:
      return {
        ...state,
        tasklist: state.tasklist.filter(
          (task) => task.id !== action.payload.id
        ),
      };
    case UPDATE_TASK:
      return {
        ...state,
        tasklist: action.payload,
      };
    case SORT_TASK:
      return {
        ...state,
        tasklist: action.payload,
      };
    case SET_VISIBILITY_FILTER:
      return action.filter;
    default:
      return state;
  }
}

export default taskReducer;
