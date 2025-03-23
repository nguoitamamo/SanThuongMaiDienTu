import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import TabNavigator from "./template/footer";
import MainStack from "./template/footer";
import { Provider } from "react-redux";
import store from "./redux/Store";
// 🟢 Màn hình sản phẩm


// 🏗 Navigation Container chính
export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>

        <MainStack />

      </NavigationContainer>
    </Provider>

  );
}
