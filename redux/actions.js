// Define action types
export const GET_TASK = "GET_TASK";
export const ADD_TO_TASK_LIST = "ADD_TO_TASK_LIST";
export const REMOVE_FROM_TASK_LIST = "REMOVE_FROM_TASK_LIST";
export const UPDATE_TASK = "UPDATE_TASK";
export const SORT_TASK = "SORT_TASK";
export const SET_VISIBILITY_FILTER = "SET_VISIBILITY_FILTER";

// export const getBooks = () => {
//   try {
//     return async (dispatch) => {
//       // const response = await axios.get(`${BASE_URL}`);
//       let resp = await loadTask();
//       if (resp) {
//         dispatch({
//           type: GET_BOOKS,
//           payload: resp,
//         });
//       } else {
//         console.log("Unable to fetch data from the API BASE URL!");
//       }
//     };
//   } catch (error) {
//     // Add custom logic to handle errors
//     console.log(error);
//   }
// };

export const addTask = (task) => (dispatch) => {
  dispatch({
    type: ADD_TO_TASK_LIST,
    payload: task,
  });
};

export const removeTask = (task) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_TASK_LIST,
    payload: task,
  });
};

export const updateTask = (taskList) => (dispatch) => {
  dispatch({
    type: UPDATE_TASK,
    payload: taskList,
  });
};

export const sortTask = (taskList) => (dispatch) => {
  dispatch({
    type: SORT_TASK,
    payload: taskList,
  });
};

export const setVisibilityFilter = (filter) => ({
  type: SET_VISIBILITY_FILTER,
  filter,
});

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};
