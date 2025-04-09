import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Searchbar, ActivityIndicator } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/MaterialIcons';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { addImage, removeImageID, removeImage} from '../../redux/imageSlice';
import API, { endpoints } from '../../Networking/API';

const TextInputCommnet = ({ id, onCommentSuccess = null, CommentID = null }) => {
    const [comment, setComment] = useState('');
    const [newImage, setNewImage] = useState({ id: 0, nameImage: '', avatar: '' });

    const dispatch = useDispatch();
    const ImageProduct = useSelector((state) => state.images.ImageProduct);
    const [loading, setLoading] = useState(false);


    const user = useSelector((state)=>state.user.user);
    const token = useSelector((state)=>state.user.token);

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
                id: ImageProduct.length + 1,
                nameImage: imageUri.split('/').pop(),
                avatar: imageUri,
            });
        }
    };

    const SendCommnet = async () => {

        setLoading(true);

        console.log('Comment:', comment);
        console.log('Images:', ImageProduct);
        try {

            const formData = new FormData();
            formData.append('content', comment);
            formData.append('IDEdComment', id);
            formData.append('CommentID', CommentID?CommentID:"")
            ImageProduct.forEach((image) => {
                formData.append("list_image", {
                    uri: image.avatar,
                    name: image.nameImage,
                    type: image.type || "image/jpeg",
                });
            });


            await API.post(endpoints.customers + user.id + "/add_comment/",
                formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                }
            })
            dispatch(removeImage());
            setComment('');
            if (onCommentSuccess) onCommentSuccess(); 

        } catch (error) {
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAwareScrollView>
            {ImageProduct.length > 0 && (
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    style={{ paddingHorizontal: 10, marginTop: 10 }}
                >
                    {ImageProduct.map((img) => (
                        <View key={img.id} style={{ position: 'relative', marginRight: 10 }}>
                            <Image
                                source={{ uri: img.avatar }}
                                style={{
                                    width: 80,
                                    height: 80,
                                    borderRadius: 10,
                                    borderWidth: 1
                                }}
                            />

                            <TouchableOpacity
                                onPress={() => dispatch(removeImageID(img.id))}
                                style={{
                                    position: 'absolute',
                                    top: -1,
                                    right: -6,
                                    backgroundColor: 'red',
                                    borderRadius: 10,
                                    padding: 2,
                                }}
                            >
                                <Icon name="close" size={16} color="#fff" />
                            </TouchableOpacity>
                        </View>
                    ))}
                </ScrollView>
            )}
            <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
                {loading && (<ActivityIndicator animating={true} />)}
                <Searchbar
                    placeholder="Nhập bình luận..."
                    value={comment}
                    onChangeText={setComment}
                    onIconPress={SendCommnet}
                    onSubmitEditing={SendCommnet}
                    onClearIconPress={() => {
                        dispatch(removeImage());
                        setComment('');
                    }}
                    style={{ borderRadius: 10, flex: 1 }}
                />
                <TouchableOpacity onPress={pickImage} style={{ marginLeft: 10 }}>
                    <Icon name="image" size={28} color="#555" />
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default TextInputCommnet;
