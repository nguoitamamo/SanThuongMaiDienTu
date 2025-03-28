import * as React from 'react';
import { Appbar, Avatar, Card, List, Divider } from 'react-native-paper';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaProvider } from "react-native-safe-area-context";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';  // Thêm useNavigation
import SignUp from './SignUp';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPermissions } from '../redux/permission';

const menuItems = [
    { id: '1', name: 'Ưu đãi của bạn', icon: 'ticket-percent', codename: "UuDaiCuaBan" },
    { id: '2', name: 'Cập nhật mật khẩu', icon: 'lock-outline', codename: "CapNhatMatKhau" },
    { id: '4', name: 'Xác nhận đăng kí bán hàng của khách hàng', icon: 'message-alert-outline', codename: "XacNhanDangKiBanHangChoKhachHang" },
    { id: '5', name: 'Quản lí cửa hàng', icon: 'file-document-outline', codename: "QuanLiCuaHang" },
];


const TaiKhoan = () => {
    const navigation = useNavigation();
    const { user } = useSelector((state) => state.user);

    const dispatch = useDispatch();
    const { data: permissions, loading, error } = useSelector((state) => state.permissions);

    useEffect(() => {
        if (user?.id) {
            dispatch(fetchPermissions(user.id)); // Gọi action để lấy quyền
        }
    }, [user, dispatch]);

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                {/* Header */}
                <Appbar.Header style={{ backgroundColor: "white", elevation: 0 }}>
                    <Appbar.Content
                        title="Tài khoản"
                        titleStyle={{ fontSize: 24, fontWeight: "bold", color: "#2C2C2C" }}
                    />
                    <Appbar.Action icon="heart-outline" />
                    <Appbar.Action icon="chat-processing-outline" />
                    <Appbar.Action icon="cog-outline" onPress={() => navigation.navigate("ThongTinCaNhan")} />
                </Appbar.Header>

                {/* User Info */}
                <View style={{ height: 100 }}>
                    <Card style={styles.body}>
                        <Card.Content>
                            <View style={styles.row}>
                                <Avatar.Image size={60} source={{ uri: "https://your-avatar-url.com" }} />
                                <Text style={styles.text}>Huỳnh Ngọc Trương</Text>
                            </View>
                        </Card.Content>
                    </Card>
                </View>

                {/* Menu */}
                <View>
                    <Card style={styles.card}>
                        {Array.isArray(permissions) && permissions.length > 0 ? (
                            permissions.map((item, index) => (
                                <View key={item.id}>
                                    <List.Item
                                        title={item.name}
                                        left={() => (
                                            <MaterialCommunityIcons name="ticket-percent" size={24} color="#d81b60" />
                                        )}
                                        right={() => (
                                            <MaterialCommunityIcons name="chevron-right" size={24} color="#999" />
                                        )}
                                        onPress={() => navigation.navigate(item.codename)}
                                        titleStyle={styles.title}
                                    />
                                    {index < permissions.length - 1 && <Divider />}
                                </View>
                            ))
                        ) : (
                            <Text style={{ textAlign: "center", padding: 20 }}>Không có quyền nào</Text>
                        )}

                    </Card>
                </View>

            </View>

            {/* <MainStack /> */}

        </SafeAreaProvider>
    );


};


// const TaiKhoan = () => {
//     return (

//         <Stack.Navigator>
//             <Stack.Screen name="TaiKhoanScreen" component={TaiKhoanScreen} options={{ headerShown: false }} />
//             <Stack.Screen name="ThongTinCaNhan" component={ProfileScreen} options={{ title: "Thông tin cá nhân" }} />
//         </Stack.Navigator>
//     );
// };

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#f8f8f8' },
    body: { flex: 1, flexDirection: "row", alignItems: 'center', justifyContent: 'center', margin: 10 },
    row: { flexDirection: 'row', alignItems: 'center' },
    text: { marginLeft: 10, fontWeight: 'bold', fontSize: 22 },
    card: { marginHorizontal: 10, marginVertical: 5, borderRadius: 10 },
    title: { fontSize: 16, color: '#333' }
});

export default TaiKhoan;
