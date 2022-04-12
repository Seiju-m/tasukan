// export default App;
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider } from "native-base";

import store, { persistor } from "./redux/store";
import Layout from "./component/Layout";

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
