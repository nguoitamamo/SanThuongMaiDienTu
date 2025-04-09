import { ScrollView, TouchableOpacity } from "react-native";
import { Card, Title, Paragraph, } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LoadSuggestProduct } from "../../redux/userSlice";


const SuggestProduct = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(LoadSuggestProduct());
    }, [dispatch])

    const products = useSelector((state) => state.user.LoadSuggestProduct);




    return (

        <Card style={{ padding: 10, marginTop: 10 }}>
            <Title style={{ fontSize: 18, fontWeight: 'bold' }}>SẢN PHẨM NỔI BẬT</Title>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>
                {products && (
                    products.map((product) => (
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
                    ))

                )}
            </ScrollView>
        </Card>

    );


}

export default SuggestProduct;