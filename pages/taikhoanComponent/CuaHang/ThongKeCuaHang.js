import { useState } from "react";
import { View, StyleSheet, Image, ScrollView } from "react-native";
import InfoSupplier from "../../components/supplier";
import { useSelector } from "react-redux";
import { Button, Menu, Divider, PaperProvider, Text, Card } from "react-native-paper";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import API, { endpoints } from "../../../Networking/API";


const ThongKeCuaHang = () => {
    const info = useSelector((state) => state.user.supplier);
    const [visible, setVisible] = useState(false);
    const [active, setActive] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [totalmoney, setToalMoney] = useState(0.0);


    const openMenu = () => setVisible(true);
    const closeMenu = () => setVisible(false);
    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

    const [data, setData] = useState(null);

    const ThongKe = async (filter) => {


        try {

            console.log(endpoints.suppliers + user.id + "/thongke/?filter=" + filter);

            let res = await API.get(endpoints.suppliers + user.id + "/thongke/?filter=" + filter, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                },

            });

            setData(res.data);
        }
        catch (error) {
            console.log(error);
        }

    }

    const item = [
        { label: "Thống kê theo tháng", value: "month" },
        { label: "Thống kê theo quý", value: "quarter" },
        { label: "Thống kê theo năm", value: "year" },
        { label: "Sản phẩm đang bán", value: "sanphamdangban" }
    ];

    const handleMenuSelect = (selection) => {
        setActive(selection);
        setSelectedOption(selection);
        closeMenu();

        const selectedFilter = item.find(option => option.label === selection)?.value;
        if (selectedFilter) {
            ThongKe(selectedFilter);
        }

    };
    return (
        <PaperProvider>
            <View style={styles.container}>
                <InfoSupplier info={info} />
                <View style={styles.menuContainer}>
                    <Menu
                        visible={visible}
                        onDismiss={closeMenu}
                        anchor={
                            <Button
                                mode="contained"
                                onPress={openMenu}
                                labelStyle={styles.menuButtonText}
                                style={styles.menuButton}
                            >
                                {active ? `${active}` : "Chọn thống kê"}
                            </Button>
                        }
                    >
                        <Menu.Item onPress={() => handleMenuSelect("Thống kê theo tháng")} title="Thống kê theo tháng" />
                        <Divider />
                        <Menu.Item onPress={() => handleMenuSelect("Thống kê theo quý")} title="Thống kê theo quý" />
                        <Divider />
                        <Menu.Item onPress={() => handleMenuSelect("Thống kê theo năm")} title="Thống kê theo năm" />
                        <Divider />
                        <Menu.Item onPress={() => handleMenuSelect("Sản phẩm đang bán")} title="Thống kê sản phẩm đang bán" />
                    </Menu>
                </View>








                {selectedOption === "Sản phẩm đang bán" ? (

                    <ScrollView>
                        <View style={styles.base}>

                            {data && Array.isArray(data.Results) && data.Results.length > 0 ? (
                                data.Results.map((category, categoryIndex) => (
                                    <View key={categoryIndex} style={{ marginBottom: 20 }}>
                                        <Text style={{ fontWeight: 'bold' }}>{category.CategoryName}</Text>


                                        {Array.isArray(category.Products) && category.Products.length > 0 ? (
                                            category.Products.map((product, productIndex) => (
                                                <Card key={productIndex} style={{ marginTop: 10 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                        <Image
                                                            source={{ uri: product.images[0] || 'https://via.placeholder.com/100' }}
                                                            style={{ width: 80, height: 80,  backgroundColor: 'red', borderRadius: 10 }}
                                                        />
                                                        <View style={{ marginLeft: 10, flex: 1 }}>
                                                            <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{product.ProductName}</Text>
                                                            <Text style={{ fontSize: 12, color: 'red', fontWeight: 'bold' }}>
                                                                Giá: {product.UnitPrice}
                                                            </Text>
                                                            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                                <Text style={{ fontSize: 12 }}>Số lượng: {product.NumberInStore}</Text>
                                                                <Text style={{ fontSize: 12 }}>Số lượng đã bán: {product.NumberBuyed}</Text>

                                                            </View>

                                                        </View>
                                                    </View>
                                                </Card>
                                            ))
                                        ) : (
                                            <Text>không có sản phẩm trong danh mục này</Text>
                                        )}
                                    </View>
                                ))
                            ) : (
                                <Text>Chọn kiểu thống kê</Text>
                            )}
                        </View>

                    </ScrollView>

                ) : (

                    <ScrollView>
                        <View style={styles.base}>

                            {data && Array.isArray(data.Results) && data.Results.length > 0 ? (
                                data.Results.map((item) => (
                                    <View key={item?.Order_id} style={{ marginBottom: 20 }}>
                                       
                                        <Text style={{ fontWeight: 'bold' }}>{item?.Product__Category__CategoryName}</Text>


                                        <Card style={{ marginTop: 10 }}>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                                <View style={{ marginLeft: 10, flex: 1 }}>
                                                    <Text style={{ fontSize: 14, fontWeight: 'bold' }}>{item?.Product__ProductName}</Text>
                                                    <Text style={{ fontSize: 14, fontWeight: 'bold', color: "red" }}>
                                                        Giá: {item?.total_money ? item.total_money.toLocaleString('en-US') + ' VND' : 'N/A'}
                                                    
                                                    </Text>
                                                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                                                        <Text style={{ fontSize: 12 }}>Số lượng đơn hàng: {item?.total_order}</Text>
                                                        <Text style={{ fontSize: 12 }}>Số lượng sản phẩm: {item?.total_products}</Text>

                                                    </View>

                                                </View>
                                            </View>
                                        </Card>
                                    </View>
                                    
                                ))
                            
                               
                            
                            ) 
                            : (
                                <Text>Chọn kiểu thống kê</Text>
                            )}
                        </View>


                        <Text style = {[styles.base, { color: "red", fontSize: 20, fontWeight: "bold"}]}>Tổng danh thu: {data?.total ? data.total.toLocaleString('en-US') + ' VND' : 'N/A'} </Text>

                    </ScrollView>
                )}


            </View>
        </PaperProvider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
    },
    menuContainer: {
        marginLeft: 10,
        marginRight: 10
    },
    menuButton: {
        backgroundColor: '#d81b60',
        borderRadius: 8,
        paddingVertical: 5,
    },
    menuButtonText: {
        fontSize: 16,
    },
    base: {
        marginTop: 10,
        marginLeft: 10,
        marginRight: 10
    },
    categoryContainer: {
        marginTop: 20,
        marginBottom: 20,
    },
    categoryTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default ThongKeCuaHang;
