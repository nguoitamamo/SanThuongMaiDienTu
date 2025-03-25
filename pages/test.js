import React, { useState } from "react";
import { View, Image, Button, Alert } from "react-native";
import * as ImagePicker from "expo-image-picker";

const ImageUploader = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Hàm chọn ảnh từ thư viện
  const pickImage = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Lỗi", "Bạn cần cấp quyền truy cập thư viện ảnh!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  // Hàm chụp ảnh từ camera
  const takePhoto = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      Alert.alert("Lỗi", "Bạn cần cấp quyền sử dụng camera!");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  return (
    <View style={{ alignItems: "center", marginTop: 20 }}>
      {selectedImage && (
        <Image
          source={{ uri: selectedImage }}
          style={{ width: 200, height: 200, marginBottom: 10, borderRadius: 10 }}
        />
      )}
      <Button title="Chọn ảnh từ thư viện" onPress={pickImage} />
      <Button title="Chụp ảnh mới" onPress={takePhoto} />
    </View>
  );
};

export default ImageUploader;
