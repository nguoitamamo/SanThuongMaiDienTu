import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Avatar, TextInput } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ThongKeCuaHang from './ThongKeCuaHang';
import KhuyenMai from './KhuyenMai';
import QuanLiSanPham from './QuanLiSanPham';



const Tab = createBottomTabNavigator();



const QuanLiCuaHang = () => {
    const [CategoryInput, SetCategoryInput] = useState('');
    // const [DanhMuc, setDanhMuc] = useState('');
    const [ProductName, setProductName] = useState('');
    const [UnitPrice, setUnitPrice] = useState('');
    const [NumberInStore, setNumberInStore] = useState(0);
    const [Description, setDescription] = useState('');



    // Xử lý khi nhấn nút "Thêm"
    // const handleAddProduct = () => {
    //     if (!ProductName || !NumberInStore || !Description) {
    //         alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
    //         return;
    //     }

    //     // Cập nhật danh sách sản phẩm
    //     setProducts((prevProducts) => [
    //         ...prevProducts,
    //         {
    //             ProductName,
    //             UnitPrice,
    //             NumberInStore,
    //             Description,
    //         },
    //     ]);

    //     // Reset lại input
    //     setDanhMuc("");
    //     setProductName("");
    //     setUnitPrice("");
    //     setNumberInStore("");
    //     setDescription("");
    // };

    // // useEffect chạy khi `products` thay đổi
    // useEffect(() => {
    //     console.log("Danh sách sản phẩm mới:", products);
    // }, [products]);



    const [open, setOpen] = useState(false);
    const [DanhMuc, setDanhMuc] = useState(null);
    const [items, setItems] = useState([
        { label: "Điện thoại", value: "phone" },
        { label: "Laptop", value: "laptop" },
        { label: "Máy tính bảng", value: "tablet" },
    ]);


    const props = {
        CategoryInput, SetCategoryInput, ProductName, setProductName,
        UnitPrice, setUnitPrice, NumberInStore, setNumberInStore,
        Description, setDescription, open, setOpen, DanhMuc, setDanhMuc,
        items, setItems
    };


    return (
        <View style={styles.container}>



            <View style={{ height: 100, paddingHorizontal: 16 }}>
                <Card style={styles.body}>
                    <Card.Content>
                        <View style={styles.row}>
                            <Avatar.Image size={60} source={{ uri: 'https://your-avatar-url.com' }} />
                            <Text style={styles.text}>Tên Cửa Hàng
                            </Text>
                        </View>
                    </Card.Content>
                </Card>
            </View>



            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ color, size }) => {
                        let iconName;
                        if (route.name === "DanhMuc") {
                            iconName = "storefront-outline";
                        } else if (route.name === "ThongKe") {
                            iconName = "clipboard-list-outline";
                        } else if (route.name === "KhuyenMai") {
                            iconName = "cash-multiple";
                        }

                        return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                    },
                    tabBarLabelStyle: { fontSize: 12, fontWeight: "bold" },
                    tabBarStyle: { backgroundColor: "#fff", borderTopWidth: 1, borderTopColor: "#ccc", height: 60 },
                    tabBarActiveTintColor: "#d81b60",
                    tabBarInactiveTintColor: "#444",
                })}
            >
                <Tab.Screen
                    name="ThongKe"
                    component={ThongKeCuaHang}
                    options={{ tabBarLabel: "Thống Kê" }}
                />
                <Tab.Screen
                    name="DanhMuc"
                    component={QuanLiSanPham}
                    options={{ tabBarLabel: "Danh Mục" }}
                    initialParams={props}
                />
                <Tab.Screen
                    name="KhuyenMai"
                    component={KhuyenMai}
                    options={{ tabBarLabel: "Khuyến Mãi" }}
                />
            </Tab.Navigator>


        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 16,
        marginTop: 16
        // paddingVertical: 10
        // }, button: {
        //     marginTop: 20,
        //     marginBottom: 20,
        //     backgroundColor: '#d81b60',
        //     paddingVertical: 8,
        //     borderRadius: 5,
    }, body:
    {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 10
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    text: { marginLeft: 10, fontWeight: 'bold', fontSize: 22 },
    TextInput: {
        flex: 1,
        borderRadius: 5,
    },
    button: {
        backgroundColor: '#d81b60',
        borderRadius: 5,
    }, card: {
        padding: 10,
        backgroundColor: '#fff',

    },


});

export default QuanLiCuaHang;
