import React, { useState, useEffect } from "react";
import { View, Button, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useDispatch } from "react-redux";
import { addImage } from "../../redux/imageSlice";
import { useSelector } from "react-redux";

const UploadImage = () => {
    const dispatch = useDispatch();
    const [newImage, setNewImage] = useState({id: 0,  nameImage: "", imageReal: "" });
    const providers = useSelector((state) => state.images.providers);


    useEffect(() => {
        if (newImage.id !== 0) { 
            dispatch(addImage(newImage));
        }
    }, [newImage]);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            setNewImage({
                id : providers.length + 1,
                nameImage: imageUri.split("/").pop(),
                imageReal: imageUri,
            });
            
        }
    };

    return (
        <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 10 }}>
            <Text style={{ fontSize: 18, fontWeight: "bold", marginTop: 8 }}>HÌNH ẢNH SẢN PHẨM</Text>
            <Button title="Tải ảnh" color="#d81b60" onPress={pickImage} />
        </View>
    );
};

export default UploadImage;
