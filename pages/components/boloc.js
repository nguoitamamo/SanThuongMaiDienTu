import React, { useState, useEffect } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
    ScrollView, StyleSheet
} from 'react-native';
import { RadioButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import DropDownPicker from "react-native-dropdown-picker";
import API, { endpoints } from '../../Networking/API';
import { Image } from 'react-native';
import { LoadTimKiem } from '../../redux/productTop';




const BoLoc = ({ isModalVisible, ShowBoLoc, name, resultSearch, setResultSearch }) => {

    const filterPrice = useSelector((state) => state.products.Pricefilter);
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(1000000);

    const [checked, setChecked] = useState('');


    const [minPriceEd, maxPriceEd] = checked.split('-').map(Number);



    const [open, setOpen] = useState(false);
    const [selectedSupplier, setSelectedSupplier] = useState(null);
    const [items, setItems] = useState([]);

    useEffect(() => {
        const LoadSuppliers = async () => {
            try {
                let res = await API.get(endpoints.suppliers);
                const mapped = [
                    { label: "Tất cả", value: "Tatca" },
                    ...res.data.map((supplier) => ({
                        label: supplier.CompanyName,
                        value: supplier.CompanyName,
                        icon: () => (
                            <Image
                                source={{ uri: supplier.user.avatar }}
                                style={{ width: 24, height: 24, borderRadius: 12 }}
                            />
                        ),
                    })),
                ];

                setItems(mapped);

            } catch (error) {
                console.error(error);
            }
        };
        LoadSuppliers();
    }, []);

    const UpdateresultSearch = async () => {


        url = "";
        if (name) {
            url = "name=" + name;
        }

        if (minPriceEd) {
            url = url + "&min_price=" + minPriceEd;
        }
        if (maxPriceEd) {
            url = url + "&max_price=" + maxPriceEd;
        }
        if (selectedSupplier && selectedSupplier !== "Tatca") {
            url = url + "&company_name=" + selectedSupplier;
        }


        console.log("url: " + url);
        const searchResults = await LoadTimKiem(url);
        setResultSearch(searchResults);
        ShowBoLoc();


    };


    return (
        <Modal
            isVisible={isModalVisible}
            onBackdropPress={ShowBoLoc}
            swipeDirection="down"
            onSwipeComplete={ShowBoLoc}
            animationIn="slideInUp"
            animationOut="slideOutDown"
            style={styles.modal}
        >
            <View style={styles.modalContent}>
                <Text style={styles.title}>Bộ lọc tìm kiếm</Text>
                <View>
                    <DropDownPicker
                        open={open}
                        value={selectedSupplier}
                        items={items}
                        setOpen={setOpen}
                        setValue={setSelectedSupplier}
                        setItems={setItems}
                        placeholder="Chọn nhà cung cấp..." S
                        zIndex={3000}
                        zIndexInverse={1000}
                    />
                </View>


                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.subtitle}>Mức giá</Text>
                    {Array.isArray(filterPrice) && filterPrice.length > 0 && (
                        filterPrice.map((item) => {
                            const itemValue = `${item.minprice}-${item.maxprice}`;
                            return (
                                <View key={itemValue} style={styles.checkboxContainer}>
                                    <RadioButton
                                        value={itemValue}
                                        status={checked === itemValue ? 'checked' : 'unchecked'}
                                        onPress={() => setChecked(itemValue)}
                                    />
                                    <Text>{item.label}</Text>
                                </View>
                            );
                        })
                    )}

                    <Text style={styles.subtitle}>Hoặc nhập khoảng giá phù hợp:</Text>
                    <View style={styles.priceInputContainer}>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={minPrice.toLocaleString('vi-VN')}
                            onChangeText={(text) =>
                                setMinPrice(Number(text.replace(/\D/g, '')))
                            }
                        />
                        <Text style={{ marginHorizontal: 10 }}>~</Text>
                        <TextInput
                            style={styles.input}
                            keyboardType="numeric"
                            value={maxPrice.toLocaleString('vi-VN')}
                            onChangeText={(text) =>
                                setMaxPrice(Number(text.replace(/\D/g, '')))
                            }
                        />
                    </View>

                </ScrollView>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.resetButton}>
                        <Text style={styles.resetText}>Thiết lập lại</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.applyButton} onPress={() => UpdateresultSearch()}>
                        <Text style={styles.applyText}>Áp dụng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>

    );
}



export default BoLoc;
const styles = StyleSheet.create({
    container: {
        flex: 1, justifyContent: 'center', alignItems: 'center',
    },
    openButton: {
        backgroundColor: '#d32f2f', padding: 15, borderRadius: 10,
    },
    openButtonText: {
        color: '#fff', fontWeight: 'bold',
    },
    modal: {
        justifyContent: 'flex-end', margin: 0,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        maxHeight: '90%',
    },
    title: {
        fontSize: 18, fontWeight: 'bold', marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
    },
    checkboxContainer: {
        flexDirection: 'row', alignItems: 'center', marginVertical: 5,
    },
    priceInputContainer: {
        flexDirection: 'row', alignItems: 'center',
        marginVertical: 15, justifyContent: 'space-between',
    },
    input: {
        padding: 8, width: '40%', height: 35,
        borderRadius: 5, textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row', justifyContent: 'space-between',
        marginTop: 20,
    },
    resetButton: {
        borderColor: '#d32f2f', borderWidth: 1,
        padding: 12, borderRadius: 5, width: '48%', alignItems: 'center',
    },
    applyButton: {
        backgroundColor: '#d32f2f',
        padding: 12, borderRadius: 5, width: '48%', alignItems: 'center',
    },
    resetText: {
        color: '#d32f2f', fontWeight: 'bold',
    },
    applyText: {
        color: 'white', fontWeight: 'bold',
    }
});
