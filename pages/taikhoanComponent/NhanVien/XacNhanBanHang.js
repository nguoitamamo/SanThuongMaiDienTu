import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, ScrollView } from 'react-native';
import { Card, Button } from 'react-native-paper';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Checkbox } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { LoadSupplierDkBanHang } from '../../../redux/supplierTop';
import API, { endpoints } from '../../../Networking/API';

const XacNhanDangKiBanHangChoKhachHang = () => {
    const [checkedItems, setCheckedItems] = useState({});

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoadSupplierDkBanHang());
    }, []);
    const token = useSelector((state) => state.user.token);
    const SupplierDkBanHang = useSelector((state) => state.supplier.SupplierDkBanHang);

    const toggleCheckbox = (id) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }));
    };

    const toggleAllCheckboxes = () => {
        const allChecked = Object.values(checkedItems).every(value => value);
        const newCheckedState = {};

        SupplierDkBanHang.forEach(supplier => {
            newCheckedState[supplier.id] = !allChecked;
        });

        setCheckedItems(newCheckedState);
    };


    useEffect(() => {
        if (Array.isArray(SupplierDkBanHang)) {
            const initialChecked = {};
            SupplierDkBanHang.forEach(s => {
                initialChecked[s.id] = false; 
            });
            setCheckedItems(initialChecked);
        }
    }, [SupplierDkBanHang]);

    useEffect(() => {
        console.log(checkedItems);
    }, [checkedItems])

    const [loading, setLoading] = useState(false);
    const XacNhanDKBanHang = async () => {
        try {
            console.log(token);

            setLoading(true);

            const selectedIds = Object.keys(checkedItems).filter(id => checkedItems[id]);

            if (selectedIds.length === 0) {
                return;
            }

            await Promise.all(
                selectedIds.map(async (id) => {
                    await API.patch(endpoints.suppliers + id + "/xacnhan_dk_banhang/", {}, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                        },
                    });
                })
            );
            dispatch(LoadSupplierDkBanHang());
        } catch (error) {
            console.error("Lỗi khi xác nhận:", error);
        }
        finally {
            setLoading(false);
        }
    };


    return (
        <View style={styles.container}>
            <ScrollView>
                {Array.isArray(SupplierDkBanHang) && SupplierDkBanHang.length > 0 ? (
                    SupplierDkBanHang.map((supplier) => (
                        <Card key={supplier.id} style={{ marginBottom: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <Image source={{ uri: supplier?.user?.avatar }}
                                    style={{ width: 80, height: 80, borderRadius: 10 }} />
                                <View style={{ marginLeft: 10, flex: 1 }}>
                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{supplier.CompanyName}</Text>
                                    <Text style={{ fontSize: 12 }}>Mô tả: {supplier.Description}</Text>
                                </View>
                                <Checkbox
                                    status={checkedItems[supplier.id] ? 'checked' : 'unchecked'}
                                    onPress={() => toggleCheckbox(supplier.id)}
                                />
                            </View>
                        </Card>
                    ))
                ) : (
                    <Text style={{ textAlign: "center", padding: 20 }}>Không có nhà cung cấp nào đăng ký</Text>
                )}
            </ScrollView>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20, alignItems: 'center' }}>
                <Text>Chọn tất cả</Text>
                <Checkbox
                    status={Object.values(checkedItems).every(value => value) ? 'checked' : 'unchecked'}
                    onPress={toggleAllCheckboxes}
                />

            </View>

            <Button mode="contained" style={styles.button} onPress={XacNhanDKBanHang} loading={loading}>
                {loading ? "Đang xác nhận...": "Xác nhận"}
            </Button>
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
