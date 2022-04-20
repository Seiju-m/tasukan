// export default App;
import React from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { NativeBaseProvider } from "native-base";
import { LogBox } from "react-native";
import Styles from "./styles";

import store, { persistor } from "./redux/store";
import Layout from "./component/Layout";
LogBox.ignoreLogs(["NativeBase:"]);

export default function App() {
  return (
    <NativeBaseProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Layout style={Styles.globalStyle} />
        </PersistGate>
      </Provider>
    </NativeBaseProvider>
  );
}
