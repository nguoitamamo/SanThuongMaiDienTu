import React, { useEffect, useState, useCallback } from 'react';
import { View, Image, Text, StyleSheet, ScrollView, TouchableOpacity, RefreshControl } from 'react-native';
import { Card, Button, Checkbox, RadioButton, IconButton } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import API, { endpoints } from '../Networking/API';
import { LoadGioHang, UpdateGioHang, RemoveProductGioHang } from '../redux/cart';


const GioHang = () => {
    const [checkedItems, setCheckedItems] = useState({});
    const [selectAll, setSelectAll] = useState(false);

    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

    const dispatch = useDispatch();
    const navigation = useNavigation();


    const cart = useSelector((state) => state.cart.products);

    const toggleItemChecked = (id) => {
        setCheckedItems((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const handleSelectAll = () => {
        const newCheckedStatus = {};
        if (!selectAll) {
            cart.forEach((item) => {
                newCheckedStatus[item.OrderID] = true;
            });
        }
        setCheckedItems(newCheckedStatus);
        setSelectAll(!selectAll);
    };

    const totalPrice = cart.reduce((total, item) => {
        if (checkedItems[item.ProductID]) {
            return total + (parseFloat(item.UnitPrice.replace(' VND', '').replace(',', '')) || 0) * item.quantity;
        }
        return total;
    }, 0);


    const handleDatHang = () => {
        const selectedProducts = cart.filter((item) => checkedItems[item.ProductID]);
        if (selectedProducts.length === 0) {
            alert("Vui lòng chọn ít nhất một sản phẩm để đặt hàng.");
            return;
        }


        navigation.navigate('ThanhToan', { selectedProducts });
    };


    const RemoveOrderCart = async (orderid) => {
        await dispatch(RemoveProductGioHang({userid: user.id , orderid, token}))
        dispatch(LoadGioHang({ userid: user.id }));
    }

    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);

        setTimeout(() => {
            setRefreshing(false);
            dispatch(LoadGioHang({ userid: user.id }));
        }, 500);
    });

    const handleChangeQuantity = ({ ProductID, OrderID, quantity }) => {
       
        if (quantity >= 1) {
            dispatch(UpdateGioHang({ ProductID, OrderID, token, quantity }));
        }else {
            RemoveOrderCart(OrderID);
        }
    }


    return (
        <View style={styles.container}>
            {user ? (
                <ScrollView
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                    }
                >

                    {Array.isArray(cart) && cart.length > 0 ? (
                        cart.map((item) => (
                            <View key={item.OrderID} style={{ marginBottom: 20 }}>

                                {Array.isArray(item.order_details) && item.order_details.length > 0 ? (
                                    item.order_details.map((product, productIndex) => (
                                        <Card key={productIndex} style={{ marginTop: 10 }}>

                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <View style={{ position: 'relative', width: 80, height: 80 }}>
                                                    <Image
                                                        source={{ uri: product.product.images[0] || 'https://via.placeholder.com/100' }}
                                                        style={styles.image}
                                                    />
                                                    <MaterialCommunityIcons
                                                        name="close-circle"
                                                        size={20}
                                                        color="white"
                                                        style={styles.icon}
                                                        onPress={() => RemoveOrderCart(item.OrderID)}
                                                    />
                                                </View>

                                                <View style={{ marginLeft: 10, flex: 1 }}>
                                                    <View style={{ flexDirection: "row" }}>
                                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{product.product.ProductName}</Text>
                                                        {product.Discount !== 0.0 && (
                                                            <Text style={{ fontSize: 12 }}>Giảm giá: {product.Discount} %</Text>
                                                        )}
                                                    </View>
                                                    <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>
                                                        Giá: {product.product.UnitPrice}
                                                    </Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>

                                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                            <IconButton
                                                                icon="minus"
                                                                size={20}
                                                                onPress={() => handleChangeQuantity({
                                                                    ProductID: product.product.ProductID,
                                                                    OrderID: item.OrderID,
                                                                    quantity: product.Quantity - 1
                                                                })}
                                                            />
                                                            <Text style={{ fontSize: 14 }}>{product.Quantity}</Text>
                                                            <IconButton
                                                                icon="plus"
                                                                size={20}
                                                                onPress={() => handleChangeQuantity({
                                                                    ProductID: product.product.ProductID,
                                                                    OrderID: item.OrderID,
                                                                    quantity: product.Quantity + 1
                                                                })}
                                                            />
                                                        </View>
                                                        <Text style={{ fontSize: 12 }}>Date: {item.created_date}</Text>


                                                    </View>
                                                </View>
                                                <Checkbox
                                                    status={checkedItems[item.OrderID] ? 'checked' : 'unchecked'}
                                                    onPress={() => toggleItemChecked(item.OrderID)}
                                                />

                                            </View>

                                        </Card>
                                    ))
                                ) : (
                                    <Text>không có sản phẩm trong danh mục này</Text>
                                )}

                            </View>
                        ))
                    ) : (
                        <Text>không có sản phẩm trong danh mục này</Text>
                    )}



                </ScrollView>
            ) : (
                <View>
                    <Text>Bạn cần đăng nhập</Text>
                    <Button mode="contained" style={styles.button} onPress={() => { navigation.navigate("SignIn"); }}>
                        Đăng nhập
                    </Button>
                </View>
            )}

            {user && cart.length > 0 && (
                <View>
                    <View style={styles.selectAllContainer}>
                        <Text>Chọn tất cả</Text>
                        <Checkbox
                            status={selectAll ? 'checked' : 'unchecked'}
                            onPress={handleSelectAll}
                        />

                    </View>

                    {/* <Text style={styles.totalPrice}>Tổng tiền: {totalPrice.toLocaleString()} VND</Text> */}

                    <Button mode="contained" style={styles.button} onPress={handleDatHang}>
                        Đặt hàng
                    </Button>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingVertical: 10,
    },
    card: {
        marginBottom: 10,
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    productImage: {
        width: 80,
        height: 80,
        marginLeft: 10,
        borderRadius: 10,
        backgroundColor: '#eee',
    },
    productInfo: {
        marginLeft: 10,
        flex: 1,
    },
    productName: {
        fontSize: 14,
        fontWeight: 'bold',
    },
    productPrice: {
        fontSize: 12,
        color: 'red',
        fontWeight: 'bold',
    },
    productQuantity: {
        fontSize: 12,
    },
    selectAllContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        alignItems: 'center',
    },
    totalPrice: {
        fontWeight: 'bold',
        marginVertical: 10,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#d81b60',
        paddingVertical: 8,
        borderRadius: 5,
    },
    icon: {

        position: 'absolute',
        top: -5,
        left: 0,
        backgroundColor: 'red',
        borderRadius: 10,

    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 10,
        backgroundColor: 'red',
    }

});

export default GioHang;
