import React from "react";
import { View, ScrollView, StyleSheet, Text } from "react-native";
import { Appbar, Searchbar, Card, Title, Paragraph, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import CategoryChip from "./components/category";
import CardImage from "./components/card";

import { SafeAreaProvider } from "react-native-safe-area-context";


const Product = () => {
    const [searchQuery, setSearchQuery] = React.useState("");


    const providers = [
        {
            id: 1,
            title: 'XÁC THỰC',
            image: 'https://via.placeholder.com/300',
            description: 'Nhóm nhà cung cấp xác thực.',
        },
        {
            id: 2,
            title: 'BÁN CHẠY',
            image: 'https://via.placeholder.com/300',
            description: 'Nhóm nhà cung cấp bán chạy.',
        },
        {
            id: 3,
            title: 'NẠP ĐẾN 80K',
            image: 'https://via.placeholder.com/300',
            description: 'Ưu đãi nạp tiền lên đến 80K.',
        },
    ];
    const products = [
        {
            id: 1,
            title: 'SỮA CÔNG THỨC BEAN STALK TSUYOIKO',
            price: '470.000đ',
            image: 'https://via.placeholder.com/150',
            tag: '+25K',
        },
        {
            id: 2,
            title: 'SỮA CÔNG THỨC BEAN STALK TSUYOIKO',
            price: '470.000đ',
            image: 'https://via.placeholder.com/150',
            tag: '+25K',
        },
        {
            id: 3,
            title: 'SỮA CÔNG THỨC BEAN STALK TSUYOIKO',
            price: '470.000đ',
            image: 'https://via.placeholder.com/150',
            tag: '+25K',
        }
    ];
    const navigation = useNavigation();

    return (
        <SafeAreaProvider>
            <View style={styles.container}>
                <Appbar.Header>
                    <Appbar.Content title="HNT" titleStyle={{ fontSize: 28, fontWeight: "bold", color: "#e91e63" }} />
                    <Appbar.Action icon="bell-outline" onPress={() => { }} />
                    <Appbar.Action icon="message-outline" onPress={() => { }} />
                    <Appbar.Action icon="cart-outline" onPress={() => { navigation.navigate("GioHang") }} />
                </Appbar.Header>

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
                            providers={[
                                { id: 1, image: "https://via.placeholder.com/300" },
                                { id: 2, image: "https://via.placeholder.com/301" },
                                { id: 3, image: "https://via.placeholder.com/301" },

                            ]}
                        />
                    </Card>

                    <Title style={{ fontSize: 18, fontWeight: 'bold' }}>SẢN PHẨM NỔI BẬT</Title>

                    <Card style={styles.card}>

                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>

                            {products.map((product) => (
                                <View key={product.id} style={{ width: 170, marginRight: 10 }}>


                                    <Card.Cover source={{ uri: product.image }} style={{ width: 170, marginRight: 10 }} />
                                    <Card.Content>
                                        <Title style={{ fontSize: 12 }}>{product.title}</Title>
                                        <Paragraph style={{ fontWeight: 'bold', color: 'red' }}>Giá từ: {product.price}</Paragraph>
                                    </Card.Content>

                                </View>
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
