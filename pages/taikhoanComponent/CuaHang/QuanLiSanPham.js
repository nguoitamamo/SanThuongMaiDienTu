import { View } from "react-native";
import { ScrollView, StyleSheet } from "react-native";
import { TextInput, Button, Card } from "react-native-paper";
import CategoryChip from "../../components/category";
import DropDownPicker from "react-native-dropdown-picker";
import UploadImage from "../../components/pickImage";
import CardImage from "../../components/card";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { removeImage } from "../../../redux/imageSlice"

const QuanLiSanPham = ({ route }) => {

    const { CategoryInput, SetCategoryInput, ProductName, setProductName, UnitPrice, setUnitPrice,
        NumberInStore, setNumberInStore, Description, setDescription, open, setOpen, DanhMuc,
        setDanhMuc, items, setItems } = route.params || {};

    const dispatch = useDispatch()
    
    useEffect( ()=> {
        dispatch(removeImage())
    } , [])

    
    

    return (

        <View style={{ flex: 1, paddingHorizontal: 16 }}>
            <ScrollView>


                <View style={{ flexDirection: "row", alignItems: "stretch", gap: 8 }}>
                    <TextInput
                        style={[styles.TextInput, { height: 50 }]}
                        label="Tên danh mục"
                        value={CategoryInput}
                        onChangeText={SetCategoryInput}
                        mode="outlined"
                    />

                    <Button mode="contained" style={[styles.button, { height: 50, marginTop: 7 }]} onPress={() => { }}>
                        Tạo
                    </Button>
                </View>
                <View>
                    <CategoryChip onPress={(category) => console.log(`Thống kê: ${category.name}`)} />
                </View>

                <Card style={{ padding: 10, backgroundColor: '#fff' }}>
                    <View>
                        <UploadImage />
                    </View>
                    <CardImage />

                    <View style={{ gap: 12, zIndex: 1000 }}>
                        <DropDownPicker
                            open={open}
                            value={DanhMuc}
                            items={items}
                            setOpen={setOpen}
                            setValue={setDanhMuc}
                            setItems={setItems}
                            placeholder="Chọn một danh mục..."
                        />

                        <TextInput label="Tên sản phẩm" value={ProductName} onChangeText={setProductName} mode="outlined" />
                        <TextInput label="Giá" value={UnitPrice} onChangeText={setUnitPrice} mode="outlined" keyboardType="numeric" />
                        <TextInput label="Số lượng" value={NumberInStore} onChangeText={setNumberInStore} mode="outlined" keyboardType="numeric" />
                        <TextInput label="Mô tả" value={Description} onChangeText={setDescription} mode="outlined" />
                    </View>
                </Card>



                <Button mode="contained" style={{ backgroundColor: '#d81b60', borderRadius: 5 }} >Thêm</Button>
            </ScrollView>
        </View>
        // <View style={styles.container}>
        //     <ScrollView style={{ paddingHorizontal: 16 }}>
        //         {/* Nhập danh mục */}
        //         <View style={styles.row}>
        //             <TextInput
        //                 style={[styles.TextInput, { height: 50 }]}
        //                 label="Tên danh mục"
        //                 value={Category}
        //                 onChangeText={SetCategory}
        //                 mode="outlined"
        //             />
        //             <Button mode="contained" style={styles.button} onPress={() => { }}>
        //                 Tạo
        //             </Button>
        //         </View>

        //         {/* Upload hình ảnh */}
        //         <Card style={styles.card}>
        //             <UploadImage providers={providers} setProviders={setProviders} />
        //             <CardImage providers={providers} />

        //             {/* Chọn danh mục */}
        //             <DropDownPicker
        //                 open={open}
        //                 value={value}
        //                 items={items}
        //                 setOpen={setOpen}
        //                 setValue={setValue}
        //                 setItems={setItems}
        //                 placeholder="Chọn một danh mục..."
        //                 style={{ marginBottom: 10 }}
        //             />

        //             {/* Nhập thông tin sản phẩm */}
        //             <TextInput label="Tên sản phẩm" value={ProductName} onChangeText={setProductName} mode="outlined" />
        //             <TextInput label="Giá" value={UnitPrice} onChangeText={setUnitPrice} mode="outlined" keyboardType="numeric" />
        //             <TextInput label="Số lượng" value={NumberInStore} onChangeText={setNumberInStore} mode="outlined" keyboardType="numeric" />
        //             <TextInput label="Mô tả" value={Description} onChangeText={setDescription} mode="outlined" />
        //         </Card>

        //         {/* Nút thêm sản phẩm */}
        //         <Button mode="contained" style={styles.addButton} onPress={handleAddProduct}>
        //             Thêm sản phẩm
        //         </Button>

        //         {/* Hiển thị danh sách sản phẩm */}
        //         <Text style={styles.title}>Danh sách sản phẩm</Text>
        //         {products.map((product, index) => (
        //             <Card key={index} style={styles.card}>
        //                 <Text>Tên: {product.ProductName}</Text>
        //                 <Text>Giá: {product.UnitPrice}</Text>
        //                 <Text>Số lượng: {product.NumberInStore}</Text>
        //                 <Text>Mô tả: {product.Description}</Text>
        //             </Card>
        //         ))}
        //     </ScrollView>
        // </View>


    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // paddingHorizontal: 16,
        marginTop: 16
        // paddingVertical: 10
        // }, button: {
        //     marginTop: 20,
        //     marginBottom: 20,
        //     backgroundColor: '#d81b60',
        //     paddingVertical: 8,
        //     borderRadius: 5,
    },
    button: {
        backgroundColor: '#d81b60',
        borderRadius: 5,
    },
    TextInput: {
        flex: 1,
        borderRadius: 5,
    },

});


export default QuanLiSanPham;