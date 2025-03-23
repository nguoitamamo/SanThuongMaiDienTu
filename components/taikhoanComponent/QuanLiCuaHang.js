
import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Avatar } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const QuanLiCuaHang = () => {
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={styles.container}>



            <View style={{ height: 100 }}>
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
                <Tab.Screen name="ThongKe" component={() => { }} options={{ tabBarLabel: "Thống Kê" }} />
                <Tab.Screen name="DanhMuc" component={() => { }} options={{ tabBarLabel: "Danh Mục" }} />
                <Tab.Screen name="KhuyenMai" component={() => { }} options={{ tabBarLabel: "Khuyến Mãi" }} />
            </Tab.Navigator>


        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 16,
        // paddingVertical: 10
    }, button: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#d81b60',
        paddingVertical: 8,
        borderRadius: 5,
    }, body:
    {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 10
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    text: { marginLeft: 10, fontWeight: 'bold', fontSize: 22 },


});

export default QuanLiCuaHang;
