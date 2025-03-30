import React from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity  } from "react-native";
import { Appbar, Searchbar, Card, Title, Paragraph, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CategoryChip from "./components/category";
import CardImage from "./components/card";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { HeaderSanPham } from "./components/headerChiTietSanPham"




const Product = () => {
    const [searchQuery, setSearchQuery] = React.useState("");

    const SupplierTop = useSelector((state) => state.supplier.supplierTop);

    const products = useSelector((state) => state.products.ProductTop)
    const navigation = useNavigation();



    const NagigateGioHang = () => {
        return navigation.navigate("GioHang")
    }


    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <HeaderSanPham onPress={NagigateGioHang} />

                <ScrollView style={{ paddingHorizontal: 16 }}>

                    <Searchbar
                        placeholder="Xe đạp ..."
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                        style={{ marginTop: 10, borderRadius: 10 }}
                    />


                    <CategoryChip onPress={(category) => console.log(`Thống kê: ${category.name}`)} />

                    <Card style={{ padding: 10 }}>
                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>NHÀ CUNG CẤP NỔI BẬT</Text>
                        <CardImage
                            providers={SupplierTop || []}
                        />
                    </Card>

                    <Title style={{ fontSize: 18, fontWeight: 'bold' }}>SẢN PHẨM NỔI BẬT</Title>

                    {/* <ProductTopCard products={products || []} /> */}
                    <Card style={{ padding: 10 }}>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>

                            {products.map((product) => (
                                <TouchableOpacity
                                    key={product.ProductID}
                                    style={{ width: 170, marginRight: 10 }}
                                    onPress={() => navigation.navigate("ChiTietSanPham", { product })} // Điều hướng đến trang chi tiết
                                >

                                    <Card.Cover source={{ uri: product.images[0] }} style={{ width: 170, marginRight: 10 }} />
                                    <Card.Content>
                                        <Title
                                            style={{ fontSize: 12 }}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >{product.ProductName} - {product.Description}</Title>
                                        <Paragraph style={{ fontWeight: 'bold', color: 'red', fontSize: 12 }}>Giá từ: {product.UnitPrice}</Paragraph>
                                    </Card.Content>

                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Card>


                </ScrollView>

            </View>
        </SafeAreaProvider>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    }, card: {
        padding: 10,


    }
});

export default Product;
