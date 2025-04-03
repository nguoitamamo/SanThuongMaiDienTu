import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { Badge } from "react-native-paper";
import { View } from "react-native";

// Import các màn hình
import Product from "../pages/Product";
import TaiKhoan from "../pages/TaiKhoan";
import Thuong from "../pages/Thuong";
import DonHang from "../pages/DonHang";
import ProfileScreen from "../pages/ThongTinCaNhan";
import SignUp from "../pages/SignUp";
import SignIn from "../pages/Signin";
import GioHang from "../pages/GioHang";
import XacNhanDangKiBanHangChoKhachHang from "../pages/taikhoanComponent/NhanVien/XacNhanBanHang";
import QuanLiSanPham from "../pages/taikhoanComponent/CuaHang/QuanLiSanPham";
import CapNhatMatKhau from "../pages/taikhoanComponent/Chung/CapNhatMatKhau";
import UuDaiCuaBan from "../pages/taikhoanComponent/KhachHang/UuDaiCuaBan";
import ThongKeCuaHang from "../pages/taikhoanComponent/CuaHang/ThongKeCuaHang";
import KhuyenMai from "../pages/taikhoanComponent/CuaHang/KhuyenMai";
import QuanLiCuaHang from "../pages/taikhoanComponent/CuaHang/QuanLiCuaHang";
import ChiTietSanPham from "../pages/ChiTietSanPham";
import Allcomment from "../pages/Allcomment";
import App from "../App";
import ThanhToan from "../pages/ThanhToan";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  const { user } = useSelector((state) => state.user);
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  useEffect(() => {
    setIsLoggedIn(!!user);
  }, [user]);

  return (
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
          } else if (route.name === "TaiKhoan" || route.name === "SignUp") {
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

      {isLoggedIn ? (
        <Tab.Screen name="TaiKhoan" component={TaiKhoan} options={{ tabBarLabel: "Tài Khoản" }} />
      ) : (
        <Tab.Screen name="SignUp" component={SignUp} options={{ tabBarLabel: "Tài Khoản" }} />
      )}
    </Tab.Navigator>
  );
};


const CartIconWithBadge = ({ navigation }) => {
  const products = useSelector(state => state.cart.products);
  const totalQuantity = products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <View style={{ position: "relative", marginRight: 15 }}>
      <MaterialIcons
        name="shopping-cart"
        size={28}
        color="black"
        onPress={() => navigation.navigate("GioHang")}
      />
      {totalQuantity > 0 && (
        <Badge
          style={{
            position: "absolute",
            top: -14,
            right: -8,
            backgroundColor: "red",
            color: "white",
            fontSize: 12
          }}
          size={20}
        >
          {totalQuantity}
        </Badge>
      )}
    </View>
  );
};

const MainStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Main" component={TabNavigator} />
    <Stack.Screen name="ThongTinCaNhan" component={ProfileScreen} options={{ headerShown: true, title: "Thông tin cá nhân" }} />
    <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: true, title: "Đăng Nhập" }} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SanPham" component={Product} />
    <Stack.Screen name="GioHang" component={GioHang} options={{ headerShown: true, title: "Giỏ hàng" }} />
    <Stack.Screen name="XacNhanDangKiBanHangChoKhachHang" component={XacNhanDangKiBanHangChoKhachHang} options={{ headerShown: true, title: "Danh sách khách hàng đăng kí bán hàng" }} />
    <Stack.Screen name="QuanLiSanPham" component={QuanLiSanPham} options={{ headerShown: true, title: "Quản lí sản phẩm" }} />
    <Stack.Screen name="CapNhatMatKhau" component={CapNhatMatKhau} options={{ headerShown: true, title: "Cập nhật mật khẩu" }} />
    <Stack.Screen name="UuDaiCuaBan" component={UuDaiCuaBan} options={{ headerShown: true, title: "Ưu đãi của bạn" }} />
    <Stack.Screen name="TaiKhoan" component={TaiKhoan} />
    <Stack.Screen name="ThongKeCuaHang" component={ThongKeCuaHang} options={{ headerShown: true, title: "Thống kê cửa hàng" }} />
    <Stack.Screen name="KhuyenMai" component={KhuyenMai} options={{ headerShown: true, title: "Thiết lập khuyến mãi" }} />
    <Stack.Screen name="QuanLiCuaHang" component={QuanLiCuaHang} options={{ headerShown: true, title: "Quản lí cửa hàng" }} />
    <Stack.Screen name="ChiTietSanPham" component={ChiTietSanPham}

      options={({ navigation }) => ({
        headerShown: true,
        title: "Chi Tiết Sản Phẩm",
        headerRight: () => <CartIconWithBadge navigation={navigation} />, // Hiển thị icon có Badge
      })}
    />


    <Stack.Screen
      name="Allcomment"
      component={Allcomment}
      options={({ navigation }) => ({
        headerShown: true,
        title: "Đánh giá",
        headerRight: () => (
          <MaterialIcons
            name="shopping-cart"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("GioHang")}
          />
        ),
      })}
    />
    <Stack.Screen name="App" component={MainStack} />
    <Stack.Screen
      name="ThanhToan"
      component={ThanhToan}
      options={({ navigation }) => ({
        headerShown: true,
        title: "ThanhToan",
        headerRight: () => (
          <MaterialIcons
            name="shopping-cart"
            size={24}
            color="black"
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate("GioHang")}
          />
        ),
      })}
    />
  </Stack.Navigator>
);

export default MainStack;
