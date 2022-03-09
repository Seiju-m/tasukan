// import { createStore, combineReducers, applyMiddleware } from "redux";
import { createStore, combineReducers } from "redux";
// import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

// import { taskReducer, visibilityFilter } from "./reducers";
import { taskReducer, todos, visibilityFilter } from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["visibilityFilter", "tasklist", "taskReducer"],
};

// const rootReducer = combineReducers({
//   taskReducer,
//   visibilityFilter,
// });
const rootReducer = combineReducers({
  todos,
  visibilityFilter,
  taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// const rootReducer = combineReducers({
//   taskReducer: persistReducer(persistConfig, taskReducer),
// });

// export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const store = createStore(persistedReducer, applyMiddleware(thunk));

const store = createStore(persistedReducer);

export const persistor = persistStore(store);

export default store;

// persistor.purge();
