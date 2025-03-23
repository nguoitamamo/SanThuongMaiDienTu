import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button, Avatar, TextInput } from 'react-native-paper';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CategoryChip from '../components/category';
// import AddToStore from '../components/addToStore';
import { useEffect } from 'react';
import CardImage from '../components/card';


const Tab = createBottomTabNavigator();



const QuanLiCuaHang = () => {
    const [Category, SetCategory] = useState('');
    const [DanhMuc, setDanhMuc] = useState('');
    const [ProductName, setProductName] = useState('');
    const [UnitPrice, setUnitPrice] = useState('');
    const [NumberInStore, setNumberInStore] = useState(0);
    const [Description, setDescription] = useState('');

    const [products, setProducts] = useState({
        ProductName: '',
        UnitPrice: '',
        NumberInStore: 0,
        Description: '',
    });



    const handleAddProduct = () => {
        if (!ProductName || !NumberInStore || !Description) {
            alert("Vui lòng nhập đầy đủ thông tin sản phẩm!");
            return;
        }
    
        setProducts({
            ProductName,
            UnitPrice,
            NumberInStore,
            Description,
        });
    
        console.log("Sản phẩm mới:", products);
    };


    useEffect(() => {

        console.log("đã nhảy");
        console.log("Danh sách sản phẩm đã thay đổi:", products);

        // Reset form về rỗng sau khi thêm sản phẩm
        setDanhMuc('');
        setProductName('');
        setUnitPrice(0);
        setNumberInStore('');
        setDescription('');
    }, [products]);


    const categories = () => {
        return (

            <View style={{ flex: 1, paddingHorizontal: 16 }}>



                <View style={{ flexDirection: "row", alignItems: "stretch", gap: 8 }}>
                    <TextInput
                        style={[styles.TextInput, { height: 50 }]}
                        label="Tên danh mục"
                        value={Category}
                        onChangeText={SetCategory}
                        mode="outlined"
                    />

                    <Button mode="contained" style={[styles.button, { height: 50 }]} onPress={() => { }}>
                        Tạo
                    </Button>
                </View>

                <View>

                    <CategoryChip onPress={(category) => console.log(`Thống kê: ${category.name}`)} />

                </View>
                {/* <AddToStore
                    DanhMuc={DanhMuc} setDanhMuc={setDanhMuc}
                    ProductName={ProductName} setProductName={setProductName}
                    UnitPrice={UnitPrice} setGia={setUnitPrice}
                    NumberInStore={NumberInStore} setNumberInStore={setNumberInStore}
                    Description={Description} setDescription={setDescription}
                /> */}
                <ScrollView>
                    <Card style={{ padding: 10, backgroundColor: '#fff' }}>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8, }}>HÌNH ẢNH SẢN PHẨM</Text>
                            <Button mode="contained" style={{ backgroundColor: '#d81b60', borderRadius: 5 }}>Tải ảnh</Button>

                        </View>
                        <CardImage

                            providers={[
                                { id: 1, image: "https://via.placeholder.com/300" },
                                { id: 2, image: "https://via.placeholder.com/301" },
                                { id: 3, image: "https://via.placeholder.com/301" },

                            ]}
                        />
                        <View style={{ gap: 12 }}>
                            <TextInput label="Danh mục" value={DanhMuc} onChangeText={setDanhMuc} mode="outlined" right={<TextInput.Icon icon="chevron-down" />} />
                            <TextInput label="Tên sản phẩm" value={ProductName} onChangeText={setProductName} mode="outlined" />
                            <TextInput label="Giá" value={UnitPrice} onChangeText={setUnitPrice} mode="outlined" />
                            <TextInput label="Số lượng" value={NumberInStore} onChangeText={setNumberInStore} mode="outlined" />
                            <TextInput label="Mô tả" value={Description} onChangeText={setDescription} mode="outlined" />
                        </View>
                    </Card>


                </ScrollView>
                <Button mode="contained" style={{ backgroundColor: '#d81b60', borderRadius: 5 }} onPress={handleAddProduct}>Thêm</Button>

            </View>


        );
    }


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
                <Tab.Screen name="ThongKe" component={() => { }} options={{ tabBarLabel: "Thống Kê" }} />
                <Tab.Screen name="DanhMuc" component={() => categories()} options={{ tabBarLabel: "Danh Mục" }} />
                <Tab.Screen name="KhuyenMai" component={() => { }} options={{ tabBarLabel: "Khuyến Mãi" }} />
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
