
import { ScrollView ,Text,  View  } from "react-native";
import { Button, TextInput , Card} from "react-native-paper";


import CardImage from "./card";


const AddToStore = ({ DanhMuc, setDanhMuc, ProductName, setProductName, UnitPrice, setUnitPrice, NumberInStore, setNumberInStore, Description, setDescription} ) => {
    return (
        <ScrollView>
            <Card style={{ padding: 10 , backgroundColor: '#fff'}}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 8, }}>HÌNH ẢNH SẢN PHẨM</Text>
                    <Button mode="contained" style={{ backgroundColor: '#d81b60', borderRadius: 5}}>Tải ảnh</Button>

                </View>
                <CardImage

                    providers={[
                        { id: 1, image: "https://via.placeholder.com/300" },
                        { id: 2, image: "https://via.placeholder.com/301" },
                        { id: 3, image: "https://via.placeholder.com/301" },

                    ]}
                />
                <View style={{ gap: 12 }}>
                    <TextInput label="Danh mục" value={DanhMuc} onChangeText={setDanhMuc} mode="outlined" right={<TextInput.Icon icon="chevron-down" />} />
                    <TextInput label="Tên sản phẩm" value={ProductName} onChangeText={setProductName} mode="outlined" />
                    <TextInput label="Giá" value={UnitPrice} onChangeText={setUnitPrice} mode="outlined" />
                    <TextInput label="Số lượng" value={NumberInStore} onChangeText={setNumberInStore} mode="outlined" />
                    <TextInput label="Mô tả" value={Description} onChangeText={setDescription} mode="outlined" />
                </View>
            </Card>

            
        </ScrollView>
    );


}


export default AddToStore;