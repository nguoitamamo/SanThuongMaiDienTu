import React, { useEffect, useState, useCallback} from "react";
import { View, ScrollView, StyleSheet, Text, TouchableOpacity, FlatList } from "react-native";
import { Searchbar, Card, Title, Paragraph, IconButton} from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CategoryChip from "./components/category";
import CardImage from "./components/card";

import { SafeAreaProvider } from "react-native-safe-area-context";

import { useSelector } from "react-redux";
import { HeaderSanPham } from "./components/headerChiTietSanPham"
import API, { endpoints } from '../Networking/API';
import OneProduct from "./components/product";
import BoLoc from "./components/boloc";
import { LoadTimKiem } from "../redux/productTop";




const Product = () => {
    const [searchQuery, setSearchQuery] = React.useState("");

    const SupplierTop = useSelector((state) => state.supplier.supplierTop);

    const products = useSelector((state) => state.products.ProductTop);
    const categories = useSelector((state) => state.category.categories);
    const suggestproducts = useSelector((state) => state.user.suggestproducts);



    const navigation = useNavigation();


    const NagigateGioHang = useCallback(() => {
        navigation.navigate("GioHang");
    }, [navigation])

    const NavigateChiTietSanPham = useCallback((product) => {
        navigation.navigate("ChiTietSanPham", { product });
    }, [navigation]);

    const [isModalVisible, setModalVisible] = useState(false);

    const [resultSearch, setResultSearch] = useState([]);

    const ShowBoLoc = () => {
        setModalVisible(!isModalVisible);
    };

    const UpdateresultSearch = async () => {
        const searchResults = await LoadTimKiem("name=" + searchQuery);
        setResultSearch(searchResults); 
        console.log(searchResults); 
    };


    return (

        <SafeAreaProvider>

            <View style={styles.container}>

                <FlatList
                    data={suggestproducts}
                    keyExtractor={(item) => item.ProductID.toString()}
                    numColumns={2}
                    columnWrapperStyle={{ justifyContent: 'space-between' }}
                    contentContainerStyle={{ paddingHorizontal: 10 }}
                    ListHeaderComponent={
                        <>
                            <HeaderSanPham NavigateGioHang={NagigateGioHang} title="HNT" />

                            <View style={{ flexDirection: "row"}}>
                                <Searchbar
                                    placeholder="Nhập tìm kiếm..."
                                    value={searchQuery}
                                    onChangeText={setSearchQuery}
                                    onIconPress={UpdateresultSearch}
                                    onSubmitEditing={UpdateresultSearch}
                                    onClearIconPress={() => {
                                        setSearchQuery("");
                                        setResultSearch([]);
                                    }}
                                    style={{ marginTop: 10, borderRadius: 10, flex: 1 }}
                                />
                                <TouchableOpacity style={{ alignItems:'center' }} onPress={() => ShowBoLoc()}>
                                    <IconButton
                                        icon="filter"
                                        size={30}
                                    />
                                    <Text>Bộ lọc</Text>
                                </TouchableOpacity>
                            </View>

                            {resultSearch.length === 0 ? (
                                <View>
                                    <CategoryChip categories={categories} />

                                    <Card style={{ padding: 10 }}>
                                        <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>NHÀ CUNG CẤP NỔI BẬT</Text>
                                        <CardImage
                                            providers={SupplierTop || []}
                                        />
                                    </Card>

                                    <Card style={{ padding: 10, marginTop: 10 }}>
                                        <Title style={{ fontSize: 18, fontWeight: 'bold' }}>SẢN PHẨM NỔI BẬT</Title>

                                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>

                                            {products.map((product) => (
                                                product && product.images && (
                                                    <TouchableOpacity
                                                        key={product?.ProductID}
                                                        style={{ width: 170, marginRight: 10 }}
                                                        onPress={() =>navigation.navigate("ChiTietSanPham" , {product})}
                                                    >

                                                        <Card.Cover source={{ uri: product?.images[0] }} style={{ width: 170, marginRight: 10 }} />
                                                        <Card.Content>
                                                            <Title
                                                                style={{ fontSize: 12 }}
                                                                numberOfLines={1}
                                                                ellipsizeMode="tail"
                                                            >{product?.ProductName} - {product?.Description}</Title>
                                                            <Paragraph style={{ fontWeight: 'bold', color: 'red', fontSize: 12 }}>Giá: {product?.UnitPrice}</Paragraph>
                                                        </Card.Content>

                                                    </TouchableOpacity>
                                                )
                                            ))}
                                        </ScrollView>
                                    </Card>
                                </View>
                            ) : (
                                <View>
                                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>KẾT QUẢ TÌM KIẾM: {searchQuery}</Text>
                                    <FlatList
                                        data={resultSearch.results}
                                        keyExtractor={(item) => item.ProductID.toString()}
                                        numColumns={2}
                                        columnWrapperStyle={{ justifyContent: 'space-between' }}
                                        contentContainerStyle={{ paddingHorizontal: 10 }}
                                        style={{ marginTop: 10 }}
                                        renderItem={({ item }) => (
                                            <OneProduct product={item} NavigateChiTietSanPham={NavigateChiTietSanPham} />
                                        )}
                                    />
                                </View>

                            )}

                            <Title style={{ fontSize: 18, fontWeight: 'bold' }}>SẢN PHẨM GỢI Ý CHO BẠN</Title>
                        </>
                    }

                    renderItem={({ item }) => (
                        <OneProduct product={item} NavigateChiTietSanPham={NavigateChiTietSanPham} />
                    )}

                />

                <BoLoc isModalVisible={isModalVisible} ShowBoLoc={ShowBoLoc} 
                        setResultSearch={setResultSearch} resultSearch = {resultSearch}
                        name = {searchQuery}/>

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
    },
   
});

export default Product;
