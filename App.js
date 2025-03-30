import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainStack from "./template/footer";
import { Provider } from "react-redux";
import store from "./redux/Store"
import { useDispatch } from "react-redux";
import { LoadSupplierTop } from "./redux/supplierTop";
import { LoadProductTop } from "./redux/productTop";
import { useEffect } from "react";


function AppContent() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadSupplierTop());
    dispatch(LoadProductTop());
  }, [dispatch]);



  return (
    <NavigationContainer>
      <MainStack />
    </NavigationContainer>
  );
}



export default function App() {


  return (
    <Provider store={store}>
      <AppContent/>
    </Provider>

  );
}
