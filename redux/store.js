import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistStore, persistReducer } from "redux-persist";

import taskReducer from "./reducers";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["tasklist"],
};

const rootReducer = combineReducers({
  taskReducer: persistReducer(persistConfig, taskReducer),
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
// export const store = createStore(rootReducer);
console.log("before persisit");
export const persistor = persistStore(store);

// persistor.purge();
