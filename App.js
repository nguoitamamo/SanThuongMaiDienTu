import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./template/footer";
import { Provider } from "react-redux";
import store from "./redux/Store"

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <MainStack/>

      </NavigationContainer>
    </Provider>

  );
}
