import React, { useState, useCallback} from "react";
import { Text, View, ScrollView, TouchableOpacity, Image, StyleSheet, FlatList } from "react-native";
import { Card, Title, Paragraph, TextInput, Icon, Button, Portal, Modal, PaperProvider } from "react-native-paper";
import { useEffect } from "react";
import API, { endpoints } from "../Networking/API";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import OneComment from "./components/OneComment";
import { useNavigation } from "@react-navigation/native";
import InfoBase from "./components/supplier";
import { AddToCart } from "../redux/cart";
import { useDispatch, useSelector } from "react-redux";
import TextInputCommnet from "./components/textInputComnet";
import OneProduct from "./components/product";



const ChiTietSanPham = ({ route }) => {
    const { product } = route.params;

    const [info, setInfo] = useState({});


    const user = useSelector((state) => state.user.user);
    const token = useSelector((state) => state.user.token);

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
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const [suggestproducts, setSuggestProducts] = useState([]);

    const LoadProductLienQuan = async () => {
        try {

            let res = await API.get(endpoints.products + "search/?name=" + product.ProductName.split(' ')[0]);
            setSuggestProducts(res.data);
        }
        catch (error) {
            console.log(error);
        }


    }


    useEffect(() => {

        fetchSupplierInfo();
        LoadComment();
        LoadProductLienQuan();
        console.log(product);

    }, []);



    const navigation = useNavigation();

    const dispatch = useDispatch();

    const [visible, setVisible] = useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);
    const containerStyle = { backgroundColor: 'white', padding: 20 };


    const addtocart = () => {
        if (user) {
            dispatch(AddToCart({ userid: user.id, token, product }));
            alert("Thêm giỏ hàng thành công");
        }
        else {
            showModal();

        }
    };

    const NagigateThanhToan = () => {
        if (user) {
            return navigation.navigate("ThanhToan");
        } else {
            showModal();
        }
    }
    const NavigateChiTietSanPham = useCallback((product) => {
        navigation.navigate("ChiTietSanPham", { product });
    }, [navigation]);



    // useFocusEffect(
    //     useCallback(() => {
    //         console.log("đã vào trang");
    //         dispatch(addIDEdComment(product.ProductID));

    //         return () => {
    //             console.log("đã thoát trang");
    //             dispatch(removeIDEdComment());

    //         };
    //     }, [dispatch, product.ProductID])
    // );



    return (
        <View style={styles.container}>

            <FlatList
                data={suggestproducts.results}
                keyExtractor={(item) => item.ProductID.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 10 }}
                ListHeaderComponent={
                    <>


                        <ScrollView>
                            <PaperProvider>
                                <Card>


                                    <Portal>
                                        <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                                            <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 20 }}>
                                                Bạn chưa đăng nhập?
                                            </Text>
                                            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
                                                <Button onPress={hideModal}>Hủy</Button>
                                                <Button onPress={() => {
                                                    hideModal();
                                                    navigation.navigate("SignIn");
                                                }}>
                                                    Đăng nhập
                                                </Button>
                                            </View>
                                        </Modal>
                                    </Portal>




                                    <View >
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
                                        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                                            <Paragraph style={styles.price}>Giá từ: {product.UnitPrice}</Paragraph>

                                            <TouchableOpacity onPress={addtocart}>
                                                <Icon source="cart" color="black" size={24} />
                                            </TouchableOpacity>

                                            <Button style={{ backgroundColor: '#d81b60' }} onPress={NagigateThanhToan}>Đặt hàng</Button>
                                        </View>
                                    </Card.Content>





                                </Card>

                                <InfoBase user={info}/>

                                <Card >
                                    <OneComment comment={commentEd} loading={loading} id={product.ProductID}   />

                                    {user ? (
                                        <TextInputCommnet id={product.ProductID}  onCommentSuccess={LoadComment}/>
                                    ) : (
                                        <TouchableOpacity>
                                            <Text style={{ color: "red", fontSize: 15, marginLeft: 10, marginBottom: 10 }}>Bạn cần đăng nhập để bình luận!</Text>
                                        </TouchableOpacity>

                                    )}

                                </Card>
                            </PaperProvider>

                            <Title style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10 }}>SẢN PHẨM LIÊN QUAN</Title>
                        </ScrollView>

                    </>
                }

                renderItem={({ item }) => (
                    <OneProduct product={item} NavigateChiTietSanPham={NavigateChiTietSanPham} />
                )}

            />



        </View>
    );
};


const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
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
