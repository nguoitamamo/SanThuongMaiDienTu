
import React from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';


const XacNhanDangKiBanHangChoKhachHang = () => {
    const [checked, setChecked] = React.useState(false);
    return (
        <View style={styles.container}>
            <ScrollView>


                <Card style={{ marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Checkbox
                            status={checked ? 'checked' : 'unchecked'}
                            onPress={() => {
                                setChecked(!checked);
                            }}


                        />
                        <Image source={{ uri: 'https://via.placeholder.com/100' }} style={{ width: 80, height: 80, marginLeft: 10, backgroundColor: "red", borderRadius: 10 }} />
                        <View style={{ marginLeft: 10, flex: 1 }}>
                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>SỮA CÔNG THỨC BEAN STALK</Text>
                            <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>Giá: 550.000đ</Text>
                            <Text style={{ fontSize: 12 }}>Số lượng: 1</Text>


                        </View>
                        <View>
                            <MaterialCommunityIcons name="close-circle" size={30} color="#d81b60" />
                        </View>
                    </View>
                </Card>



            </ScrollView>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                
                <Checkbox
                    status={checked ? 'checked' : 'unchecked'}
                    onPress={() => {
                        setChecked(!checked);
                    }}
                />
                <Text>Chọn tất cả</Text>
                <Text style={{ fontWeight: 'bold' }}>Tổng giá bán 0đ</Text>
            </View>
            <Button mode="contained" style={styles.button}>Tạo đơn</Button>

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

export default XacNhanDangKiBanHangChoKhachHang;
