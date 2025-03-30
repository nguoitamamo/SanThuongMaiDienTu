import React, { useState } from "react";
import { Text, View, ScrollView, Dimensions, Image, StyleSheet } from "react-native";
import { Card, Title, Paragraph, Avatar, TextInput } from "react-native-paper";
import { useEffect } from "react";
import API, { endpoints } from "../Networking/API";
import Icon from "react-native-vector-icons/FontAwesome";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OneComment from "./components/OneComment";
import { useNavigation } from "@react-navigation/native";

const ChiTietSanPham = ({ route }) => {
    const { product } = route.params;

    const [info, setInfo] = useState({

    });

    const [comment, setComment] = useState('');


    const fetchSupplierInfo = async () => {
        try {
            let res = await API.get(endpoints.suppliers + product.Supplier_id + "/info_short/");
            setInfo(res.data);
        } catch (error) {
            console.error("Lỗi khi gọi API111:", error);
        }
    };


    const [commentEd, setCommentEd] = useState(null);
    const [loading, setLoading] = useState(true);

    const LoadComment = async () => {
        try {
            let res = await API.get(endpoints.comments + "baseinfo/?id=" + product.ProductID + "&key=1");
            setCommentEd(res.data);
        } catch (error) {
            setLoading(false);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {

        fetchSupplierInfo();
        LoadComment();

    }, []);


    useEffect(() => {
        console.log(commentEd);
    }, [commentEd])





    // const navigation = useNavigation()
    // const NavigateAllComment = () => {
    //     return navigation.navigate("Allcomment");
    // }

    return (
        <View style={styles.container}>
            <ScrollView>
                <Card style={styles.card}>
                    <View>
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} pagingEnabled>
                            {product.images.map((image, index) => (
                                <View key={index} style={styles.imageContainer}>
                                    <Image source={{ uri: image }} style={styles.image} />
                                </View>
                            ))}
                        </ScrollView>
                    </View>



                    <Card.Content>
                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                            <Title style={styles.title}>{product.ProductName}</Title>
                            <Text style={styles.sold}>Đã bán {product.NumberBuyed}</Text>
                        </View>

                        <Paragraph>{product.Description}</Paragraph>

                        <Paragraph style={styles.price}>Giá từ: {product.UnitPrice}</Paragraph>
                    </Card.Content>



                </Card>
                <View style={[styles.supplier, styles.base]}>
                    <Card >
                        <Card.Content>
                            <View style={styles.row}>
                                <Avatar.Image size={60} source={{ uri: info?.user?.avatar }} />
                                <Text style={styles.text}>{info?.CompanyName}
                                </Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <Text>{info?.TotalRating?.toFixed(1)} / 5 </Text>
                                    <Icon name="star" size={20} color="gold" />
                                </View>
                            </View>
                        </Card.Content>
                    </Card>
                </View>







                <Card style={styles.base}>
                    <OneComment comment={commentEd} loading={loading} keyProp={true} id = {product.ProductID}/>
                    <KeyboardAwareScrollView alwaysVisible>
                        <TextInput
                            placeholder="Nhập bình luận..."
                            value={comment}
                            onChangeText={setComment}
                        />
                    </KeyboardAwareScrollView>

                </Card>




            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff", height: 10000 },
    imageContainer: { width: 360, height: 400 },
    image: { height: 400, resizeMode: 'cover', borderRadius: 10 },
    card: { margin: 10 },
    title: { fontSize: 18, fontWeight: "bold" },
    price: { fontWeight: "bold", color: "red", fontSize: 16 },
    errorText: { textAlign: "center", marginTop: 20, fontSize: 18, color: "red" },
    sold: {
        fontSize: 14,
        color: "#666",
    }
    ,
    row: { flexDirection: 'row', alignItems: 'center', justifyContent: "space-around" },
    text: { marginLeft: 10, fontWeight: 'bold', fontSize: 22 },
    supplier: {
        height: 100,

    },
    base: {
        marginLeft: 10,
        marginRight: 10,
        // marginBottom: 10,
    }
});

export default ChiTietSanPham;
