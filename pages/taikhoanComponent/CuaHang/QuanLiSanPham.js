import { View } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Card, Avatar, Text } from "react-native-paper";
import CategoryChip from "../../components/category";
import DropDownPicker from "react-native-dropdown-picker";
import UploadImage from "../../components/pickImage";
import CardImage from "../../components/card";
import { useSelector, useDispatch } from "react-redux";
import { useActionState, useEffect } from "react";
import { removeImage } from "../../../redux/imageSlice"
import API, { endpoints } from "../../../Networking/API";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import InfoSupplier from "../../components/supplier";
import { LoadCategorySupplier } from "../../../redux/userSlice";

const QuanLiSanPham = () => {

    const [CategoryInput, SetCategoryInput] = useState('');
    const [ProductName, setProductName] = useState('');
    const [UnitPrice, setUnitPrice] = useState('');
    const [NumberInStore, setNumberInStore] = useState(0);
    const [Description, setDescription] = useState('');


    const [open, setOpen] = useState(false);
    const [DanhMuc, setDanhMuc] = useState(null);
    const [items, setItems] = useState([]);

    const ImageProduct = useSelector((state) => state.images.ImageProduct);
    const userid = useSelector((state) => state.user.user.id);
    const token = useSelector((state) => state.user.token);
    const info = useSelector((state) => state.user.supplier);
    const category = useSelector((state) => state.user.category);


    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(removeImage());
        dispatch(LoadCategorySupplier());
    }, [dispatch]);

    useEffect(() => {

        if (Array.isArray(category) && category.length > 0) {
            let newItems = category.map((cate) => ({
                label: cate.CategoryName,
                value: cate.CategoryID,
            }));
            setItems(newItems); 
        }

    }, [category]);

    const AddStore = async () => {

        console.log("Danh mục: " + DanhMuc);

        try {

            let formData = new FormData();


            ImageProduct.forEach((image) => {
                formData.append("list_image", {
                    uri: image.avatar,
                    name: image.nameImage,
                    type: image.type || "image/jpeg",
                });
            });
            formData.append("ProductName", ProductName);
            formData.append("UnitPrice", UnitPrice);
            formData.append("NumberInStore", NumberInStore);
            formData.append("Description", Description);

            console.log(formData);

            await API.post(endpoints.users + userid + "/add_store/?category_id=" + DanhMuc, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })

            setProductName();
            setUnitPrice();
            setNumberInStore();
            setDescription();
            Alert("Thêm đơn hàng thành công");
        }
        catch (error) {
            console.log(error);
        }

    }

    return (

        <View style={styles.container}>

            <InfoSupplier info={info} />

            <View style={{
                flexDirection: "row", alignItems: "stretch", gap: 8, marginLeft: 10,
                marginRight: 10
            }}>
                <TextInput
                    style={[styles.TextInput, { height: 50 }]}
                    label="Tên danh mục"
                    value={CategoryInput}
                    onChangeText={SetCategoryInput}
                    mode="outlined"
                />

                <Button mode="contained" style={[styles.button, { height: 50, marginTop: 7 }]}>
                    Tạo
                </Button>
            </View>
            <View style={styles.base}>
                <CategoryChip categories = {category}/>
            </View>
            <Button mode="contained" style={{
                backgroundColor: '#d81b60', borderRadius: 5, marginBottom: 12, marginLeft: 10,
                marginRight: 10,
            }} onPress={AddStore}>Thêm
            </Button>
            <View style={styles.base}>
                <DropDownPicker
                    open={open}
                    value={DanhMuc}
                    items={items}
                    setOpen={setOpen}
                    setValue={setDanhMuc}
                    placeholder="Chọn một danh mục..."
                />
            </View>

            <ScrollView>

                <View style={styles.base}>
                    <UploadImage />
                    <CardImage providers={ImageProduct} />
                </View>


                <Card style={{
                    padding: 10, marginLeft: 10,
                    marginRight: 10,
                    marginBottom: 20
                }}>




                    <KeyboardAwareScrollView
                        contentContainerStyle={{ flexGrow: 1 }}
                        keyboardShouldPersistTaps="handled"
                    >
                        <View style={{ gap: 12, marginBottom: 20, marginTop: 10 }}>
                            <TextInput label="Tên sản phẩm" value={ProductName} onChangeText={setProductName} mode="outlined" />
                            <TextInput label="Giá" value={UnitPrice} onChangeText={setUnitPrice} mode="outlined" keyboardType="numeric" />
                            <TextInput label="Số lượng" value={NumberInStore} onChangeText={setNumberInStore} mode="outlined" keyboardType="numeric" />
                            <TextInput label="Mô tả" value={Description} onChangeText={setDescription} mode="outlined" />
                        </View>
                    </KeyboardAwareScrollView>







                </Card>

            </ScrollView>



        </View >


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,

        marginTop: 16,
        // paddingHorizontal: 16

    },
    button: {
        backgroundColor: '#d81b60',
        borderRadius: 5,
    },
    TextInput: {
        flex: 1,
        borderRadius: 5,
    },
    body:
    {
        flexDirection: "row",
        alignItems: 'center',
        justifyContent: 'center',
        // margin: 10
    },
    row: { flexDirection: 'row', alignItems: 'center' },
    text: { marginLeft: 10, fontWeight: 'bold', fontSize: 22 },
    base: {
        marginLeft: 10,
        marginRight: 10,
        // marginBottom: 10,
    }

});


export default QuanLiSanPham;