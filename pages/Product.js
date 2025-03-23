import React from "react";
import { View, Image, ScrollView, StyleSheet, Dimensions } from "react-native";
import { Appbar, Text, Searchbar, Card, Button, Chip, Title, Paragraph, Badge } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const Product = () => {
    const [searchQuery, setSearchQuery] = React.useState("");

    const categories = [
        { id: 1, name: "Điện thoại", icon: "cellphone" },
        { id: 2, name: "Máy tính", icon: "desktop-mac" },
        { id: 3, name: "Laptop", icon: "laptop" },
        { id: 4, name: "Xe đạp", icon: "bike" },
        { id: 5, name: "Mỹ phẩm", icon: "face-woman" },
        { id: 6, name: "Thời trang", icon: "tshirt-crew" },
        { id: 7, name: "Đồng hồ", icon: "watch" },
        { id: 8, name: "Nội thất", icon: "sofa" },
    ];

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
                    style={{ marginVertical: 10, borderRadius: 10 }}
                />


                <View style={styles.chip}>
                    {categories.map((category) => (
                        <Chip
                            key={category.id}
                            icon={category.icon}
                            onPress={() => console.log(`Chọn: ${category.name}`)}

                            style={{ width: 100 }}
                        >
                            {category.name}

                        </Chip>
                    ))}
                </View>
                <Card style={styles.card}>
                    <Title style={{ fontSize: 18, fontWeight: 'bold' }}>NHÀ CUNG CẤP NỔI BẬT</Title>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>

                        {providers.map((provider) => (
                            <View key={provider.id} style={{ alignItems: 'center' }}>


                                <Card.Cover source={{ uri: provider.image }} style={{ width: 170, marginRight: 10 }} />


                            </View>
                        ))}
                    </ScrollView>
                </Card>
                <Title style={{ fontSize: 18, fontWeight: 'bold' }}>SẢN PHẨM NỔI BẬT</Title>

                <Card style={styles.card}>

                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>

                        {products.map((product) => (
                            <View key={product.id} style={{ width: 170, marginRight: 10}}>


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
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f5f5f5"
    }, chip: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 10,

    }, card: {
        marginTop: 10,
        padding: 10,


    }
});

export default Product;
