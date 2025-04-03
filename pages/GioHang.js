import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';


const GioHang = () => {
    const [checked, setChecked] = React.useState(false);
    const user = useSelector((state) => state.user.user);
    const cart = useSelector((state) => state.cart.products);

    const navigation = useNavigation();
    return (
        <View style={styles.container}>


            {user ? (

                <ScrollView>


                    {Array.isArray(cart) && cart.length > 0 ? (
                        cart.map((product) => (
                            <Card style={{ marginBottom: 10 }} key={product.ProductID} >
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Checkbox
                                        status={checked ? 'checked' : 'unchecked'}
                                        onPress={() => {
                                            setChecked(!checked);
                                        }}


                                    />
                                    <Image source={{ uri: product.images[0] }} style={{ width: 80, height: 80, marginLeft: 10, backgroundColor: "red", borderRadius: 10 }} />
                                    <View style={{ marginLeft: 10, flex: 1 }}>
                                        <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{product.ProductName}</Text>
                                        <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>Giá: {product.UnitPrice}</Text>
                                        <Text style={{ fontSize: 12 }}>Số lượng: {product.quantity}</Text>


                                    </View>
                                    <View>
                                        <MaterialCommunityIcons name="close-circle" size={30} color="#d81b60" />
                                    </View>
                                </View>
                            </Card>
                        ))

                    ) :
                        (
                            <Text>Giỏ hàng bạn đang trống!</Text>
                        )}


                </ScrollView>
            ) : (
                <View>
                    <Text>Bạn cần đăng nhập</Text>
                    <Button mode="contained" style={styles.button} onPress={() => {navigation.navigate("SignIn") }}>
                        Đăng nhập
                    </Button>
                </View>

            )}

            {user && cart.length > 0 && (
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                    <Checkbox
                        status={selectAll ? 'checked' : 'unchecked'}
                        onPress={handleSelectAll}
                    />
                    <Text>Chọn tất cả</Text>
                    <Text style={{ fontWeight: 'bold' }}>Tổng giá bán {totalPrice}đ</Text>
                    <Button mode="contained" style={styles.button}>
                        Tạo đơn
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
        paddingVertical: 10
    }, button: {
        marginTop: 20,
        marginBottom: 20,
        backgroundColor: '#d81b60',
        paddingVertical: 8,
        borderRadius: 5,
    },



});

export default GioHang;
