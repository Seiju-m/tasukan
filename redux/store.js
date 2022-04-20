import { createStore, combineReducers } from "redux";
// import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

// import { taskReducer, visibilityFilter } from "./reducers";
import { taskReducer, visibilityFilter } from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["visibilityFilter", "tasklist", "taskReducer"],
};

const rootReducer = combineReducers({
  visibilityFilter,
  taskReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);
const store = createStore(persistedReducer);
export const persistor = persistStore(store);
export default store;

// persistor.purge();
