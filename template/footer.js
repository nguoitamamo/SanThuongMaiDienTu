import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";



import Product from "../pages/Product";
import TaiKhoan from "../pages/TaiKhoan";
import Thuong from "../pages/Thuong";
import DonHang from "../pages/DonHang";
import ProfileScreen from "../pages/ThongTinCaNhan";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/Signin";
import GioHang from "../pages/GioHang";
import XacNhanDangKiBanHangChoKhachHang from "../pages/taikhoanComponent/XacNhanBanHang";
import QuanLiCuaHang from "../pages/taikhoanComponent/QuanLiCuaHang";
import CapNhatMatKhau from "../pages/taikhoanComponent/CapNhatMatKhau";
import UuDaiCuaBan from "../pages/taikhoanComponent/UuDaiCuaBan";




const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// 🏗 Tạo Tab Navigator
const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      headerShown: false,
      tabBarIcon: ({ color, size }) => {
        let iconName;
        if (route.name === "SanPham") {
          iconName = "storefront-outline";
        } else if (route.name === "DonHang") {
          iconName = "clipboard-list-outline";
        } else if (route.name === "Thuong") {
          iconName = "cash-multiple";
        } else if (route.name === "TaiKhoan") {
          iconName = "account-circle-outline";
        }

        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
      },
      tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
      tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#ccc", height: 60 },
      tabBarActiveTintColor: "#d81b60",
      tabBarInactiveTintColor: "#444",
    })}
  >
    <Tab.Screen name="SanPham" component={Product} options={{ tabBarLabel: "Sản Phẩm" }} />
    <Tab.Screen name="DonHang" component={DonHang} options={{ tabBarLabel: "Đơn Hàng" }} />
    <Tab.Screen name="Thuong" component={Thuong} options={{ tabBarLabel: "Thưởng" }} />
    <Tab.Screen name="TaiKhoan" component={TaiKhoan} options={{ tabBarLabel: "Tài Khoản" }} />
    <Tab.Screen name="SignUp" component={SignUp} options={{ tabBarLabel: "SignUp" }} />

  </Tab.Navigator>
);

// 🏗 Tạo Stack Navigator chính
const MainStack = () => (

  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={TabNavigator} />
    <Stack.Screen
      name="ThongTinCaNhan"
      component={ProfileScreen}
      options={{ headerShown: true, title: "Thông tin cá nhân" }}
    />
    <Stack.Screen name="SignIn" component={SignIn}
      options={{ headerShown: true, title: "Đăng Nhập" }}
    />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen
      name="SanPham"
      component={Product}

    />
    <Stack.Screen
      name="GioHang"
      component={GioHang}
      options={{ headerShown: true, title: "Giỏ Hàng" }}
    />
    <Stack.Screen
      name="XacNhanDangKiBanHangChoKhachHang"
      component={XacNhanDangKiBanHangChoKhachHang}
      options={{ headerShown: true, title: "Danh sách khách hàng đăng kí bán hàng" }}
    />
    <Stack.Screen
      name="QuanLiCuaHang"
      component={QuanLiCuaHang}
      options={{ headerShown: true, title: "Quản lí cửa hàng" }}
    />
    <Stack.Screen
      name="CapNhatMatKhau"
      component={CapNhatMatKhau}
      options={{ headerShown: true, title: "Cập nhật mật khẩu" }}

    />
    <Stack.Screen
      name="UuDaiCuaBan"
      component={UuDaiCuaBan}
      options={{ headerShown: true, title: "Ưu đãi của bạn" }}

    />
  </Stack.Navigator>

);

export default MainStack;
